var DateTime = luxon.DateTime;

var times = document.getElementsByClassName("humanize");

for (var i = 0; i < times.length; i++) {
    var isoTime = times[i].innerHTML;
    var dt = DateTime.fromISO(isoTime);
    times[i].innerHTML = dt.toRelative();
}