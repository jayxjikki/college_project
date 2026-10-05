let calcBtn = document.getElementById("calcBtnHTML");

let savedTotal = localStorage.getItem("totalclass");
let savedAttended = localStorage.getItem("attendedclass");
let savedRemaining = localStorage.getItem("remainingclass");
let savedTarget = localStorage.getItem("targetatt");

if (savedTotal != null) {
    document.getElementById("totalclassHTML").value = savedTotal;
}

if (savedAttended != null) {
    document.getElementById("attendedclassHTML").value = savedAttended;
}

if (savedRemaining != null) {
    document.getElementById("remainingclassHTML").value = savedRemaining;
}

if (savedTarget != null) {
    document.getElementById("targetattHTML").value = savedTarget;
}

calcBtn.addEventListener("click", function() {

    let totalclassJS = Number(document.getElementById("totalclassHTML").value);
    let attendedclassJS = Number(document.getElementById("attendedclassHTML").value);
    let remainingclassJS = Number(document.getElementById("remainingclassHTML").value);
    let targetattJS = Number(document.getElementById("targetattHTML").value);

    let resultJS = document.getElementById("resultHTML");

    localStorage.setItem("totalclass", totalclassJS);
    localStorage.setItem("attendedclass", attendedclassJS);
    localStorage.setItem("remainingclass", remainingclassJS);
    localStorage.setItem("targetatt", targetattJS);

    if (totalclassJS <= 0) {
        resultJS.innerHTML = "Total classes invalid hai!";
        return;
    }

    if (attendedclassJS < 0 || attendedclassJS > totalclassJS) {
        resultJS.innerHTML = "Attended classes invalid hain!";
        return;
    }

    if (remainingclassJS < 0) {
        resultJS.innerHTML = "Remaining classes invalid hain!";
        return;
    }

    if (targetattJS <= 0 || targetattJS > 100) {
        resultJS.innerHTML = "Target attendance 1 se 100 ke beech honi chahiye!";
        return;
    }

    let currentAttendanceJS =
        (attendedclassJS / totalclassJS) * 100;

    let finalTotalJS =
        totalclassJS + remainingclassJS;

    let requiredAttendanceJS =
        Math.ceil((targetattJS / 100) * finalTotalJS);

    let needToAttendJS =
        requiredAttendanceJS - attendedclassJS;

    let canSkipJS =
        remainingclassJS - needToAttendJS;

    if (needToAttendJS <= 0) {

        let skipClassesJS = Math.floor(
            (
                attendedclassJS -
                (targetattJS / 100) * totalclassJS
            ) /
            (targetattJS / 100)
        );

        if (skipClassesJS > remainingclassJS) {
            skipClassesJS = remainingclassJS;
        }

        if (skipClassesJS < 0) {
            skipClassesJS = 0;
        }

        resultJS.innerHTML =
            "Your attendance is " +
            currentAttendanceJS.toFixed(1) +
            "%<br><br>" +
            "You need to attend <b>0</b> more classes.<br><br>" +
            "You can skip <b>" +
            skipClassesJS +
            "</b> upcoming classes and still maintain " +
            targetattJS +
            "% attendance.";

        return;
    }

    if (needToAttendJS > remainingclassJS) {

        let maximumAttendanceJS =
            (
                (attendedclassJS + remainingclassJS) /
                finalTotalJS
            ) * 100;

        resultJS.innerHTML =
            "Your attendance is " +
            currentAttendanceJS.toFixed(1) +
            "%<br><br>" +
            targetattJS +
            "% attendance is not possible.<br><br>" +
            "You need to attend <b>" +
            needToAttendJS +
            "</b> classes, but only <b>" +
            remainingclassJS +
            "</b> classes are remaining.<br><br>" +
            "Maximum possible attendance: <b>" +
            maximumAttendanceJS.toFixed(1) +
            "%</b>";

        return;
    }

    resultJS.innerHTML =
        "Your attendance is " +
        currentAttendanceJS.toFixed(1) +
        "%<br><br>" +
        "You need to attend <b>" +
        needToAttendJS +
        "</b> more classes continuously to reach " +
        targetattJS +
        "% target.<br><br>" +
        "You can skip <b>" +
        canSkipJS +
        "</b> of the remaining classes.";
});