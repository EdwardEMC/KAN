function formatTime(time) {
  let formattedTime = new Date(time).toString();

  let shorten = formattedTime.split(" GMT");

  let day = shorten[0].slice(8, 10);
  let month = shorten[0].slice(4, 7);
  let year = shorten[0].slice(11, 15);

  let hhmmss = shorten[0].slice(16, 24);

  let result =  hhmmss + " " + day + "/" + month + "/" + year;

  return result;
}

export default formatTime;