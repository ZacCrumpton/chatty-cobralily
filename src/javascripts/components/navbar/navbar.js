import moment from 'moment';
import utils from '../../helpers/utils';
import messageData from '../../helpers/data/messageData';
import message from '../message/message';
import userData from '../../helpers/data/userData';
import imageData from '../../helpers/data/logoData';


const buildNavbar = () => {
  const logo = imageData.getImage();
  let domString = '';
  logo.forEach((cobra) => {
    domString += '<div>';
    domString += '<nav id="navbarBox" class="navbar navbar-expand-lg navbar-light bg-light sticky">';
    domString += `<img id="cobraLogo" src="${cobra.image}">`;
    domString += '<form class="form-inline my-2 my-lg-0 w-75">';
    domString += '<input class="form-control w-75 mx-auto form-control-lg" type="text" id="message-field" placeholder="Enter message" aria-label="Search">';
    domString += '</form>';
    domString += '<button class="btn btn-primary btn-lg ml-5" id="clear-all-button">Clear All Messages</button>';
    domString += '</nav>';
    domString += '</div>';
  });
  utils.printToDom('nav', domString);
  $('#message-field').keypress((e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const messages = messageData.getMessages();
      if (messages.length <= 19) {
        const newMessage = {
          id: `message${messages.length + 1}`,
          message: $('#message-field').val(),
          timeStamp: moment().format('MMMM Do YYYY, h:mm a'),
          userId: userData.getSelectedUser(),
        };
        messages.push(newMessage);
        $('form').trigger('reset');
        message.messageBuilder(messages);
      } else (document.write('Too many messages'));
    }
  });
};


export default { buildNavbar };
