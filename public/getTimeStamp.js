
const dateFormat = new Date(Date.now());
const unicDate = dateFormat.getDate() < 10 ? '0' + dateFormat.getDate() : dateFormat.getDate();
const unicMonth = (dateFormat.getMonth() + 1) < 10 ? '0' + (dateFormat.getMonth() + 1) : (dateFormat.getMonth() + 1);
export const finalDate = dateFormat.getFullYear() +
    "-" + unicMonth +
    "-" + unicDate +
    " " + formatSimple(new Date);

function formatSimple(date) {
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    // var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ':' + seconds + '.490409';
    return strTime;
}

console.log(finalDate);