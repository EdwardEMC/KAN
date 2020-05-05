function shorten(message, num) {

  let charAmt = message.split("");

  if(charAmt.length > num) {
    let shrtMessage = charAmt.slice(0, num);
    shrtMessage.push("...");
    return shrtMessage.join("");
  }
  else {
    return message;
  }
}

export default shorten;