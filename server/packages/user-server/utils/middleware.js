const sharp = require('sharp');
const mkdirp = require('mkdirp');
const fs = require('fs');
const config = require('./config');
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenExtractor = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).json({ error: 'no token provided' });
  }

  const decodedToken = jwt.verify(token, config.JWT_SECRET);
  req.user = decodedToken.user;

  next();
};

const userUpdater = async (request, response, next) => {
  logger.info('In user updater!');
  logger.info(request.body);

  const { name, address, description, student, company, contact } =
    request.body;
  if (student && company) {
    request
      .status(400)
      .json({ error: 'can`t update both company and student inf' });
  }
  try {
    let searchedUser = await User.findById(request.user.id);

    if (request?.files?.profilePicture) {
      let newProfilePicture = request.files.profilePicture;
      let acceptedFileFormats = ['jpg', 'jpeg', 'png'];
      let fileFormat = newProfilePicture.name.split('.')[1];
      // eslint-disable-next-line no-unsafe-negation
      if (!fileFormat in acceptedFileFormats) {
        throw Error('Unaccepted file format!');
      }

      let uploadFolder = `public/img/${searchedUser.id}/`;
      let uploadPath = uploadFolder + `profile.${fileFormat}`;
      await mkdirp(uploadFolder);

      await sharp(newProfilePicture.tempFilePath)
        .resize(200, 200)
        .toFile(uploadPath);

      searchedUser.profilePicture = uploadPath;

      fs.unlinkSync(newProfilePicture.tempFilePath);
    }

    searchedUser.name = name === undefined ? searchedUser.name : name;
    searchedUser.address =
      address === undefined ? searchedUser.address : address;
    searchedUser.description =
      description === undefined ? searchedUser.description : description;
    searchedUser.contact.linkedin =
      contact?.linkedin === undefined
        ? searchedUser.contact?.linkedin
        : contact?.linkedin;
    searchedUser.contact.facebook =
      contact?.facebook === undefined
        ? searchedUser.contact?.facebook
        : contact?.facebook;
    searchedUser.contact.instagram =
      contact?.instagram === undefined
        ? searchedUser.contact?.instagram
        : contact?.instagram;
    searchedUser.contact.phone =
      contact?.phone === undefined
        ? searchedUser.contact?.phone
        : contact?.phone;
    searchedUser.contact.others =
      contact?.others === undefined
        ? searchedUser.contact?.others
        : contact?.others;

    if (student && searchedUser.student) {
      searchedUser.student.birthDate =
        student?.birthDate === undefined
          ? searchedUser.student?.birthDate
          : student?.birthDate;
      searchedUser.student.education =
        student?.education === undefined
          ? searchedUser.student?.education
          : student?.education;
      searchedUser.student.skills =
        student?.skills === undefined
          ? searchedUser.student.skills
          : student?.skills;
    } else if (company && searchedUser.company) {
      searchedUser.company.creationDate =
        company?.creationDate === undefined
          ? searchedUser.company?.creationDate
          : company?.creationDate;
      searchedUser.company.activityDomain =
        company?.activityDomain === undefined
          ? searchedUser.company?.activityDomain
          : company?.activityDomain;
    }

    await searchedUser.save();
    response.json(searchedUser);
  } catch (error) {
    logger.info(error);
    response.status(400).json({ error: 'no such user found!' });
  }
  next();
};

module.exports = {
  tokenExtractor,
  userUpdater,
};
