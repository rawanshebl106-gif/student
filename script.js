
// ========================================
// 1. إنشاء Class باسم Student
// ========================================

class Student {

    constructor(id, name, grades, attendance) {

        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;

    }

    // حساب متوسط الدرجات باستخدام reduce
    calculateAverage() {

        const total = this.grades.reduce(function(sum, grade) {

            return sum + grade;

        }, 0);

        return total / this.grades.length;

    }

    // تحديد التقدير
    getGrade(average) {

        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else if (average >= 50) {
            return "E";
        } else {
            return "F";
        }

    }

    // تحديد النتيجة النهائية
    getFinalResult() {

        const average = this.calculateAverage();

        if (average >= 50 && this.attendance >= 75) {

            return "ناجح";

        } else {

            return "يحتاج مراجعة";

        }

    }

}


// ========================================
// 2. إنشاء مصفوفة الطلاب الرئيسية
// ========================================

const studentsList = [

    new Student(101, "أحمد", [90, 85, 95], 90),

    new Student(102, "محمد", [45, 40, 45], 80),

    new Student(103, "سارة", [70, 75, 80], 95),

    new Student(104, "منى", [48, 42, 45], 70)

];


// ========================================
// 3. طباعة تقرير جميع الطلاب في Console
// ========================================

function displayStudentsReport() {

    console.log("========== تقرير جميع الطلاب ==========");

    const studentsReport = studentsList.map(function(student) {

        const average = student.calculateAverage();

        return {
            id: student.id,
            name: student.name,
            average: average.toFixed(2),
            grade: student.getGrade(average),
            result: student.getFinalResult()
        };

    });

    console.table(studentsReport);

}


// ========================================
// 4. لجنة الرأفة باستخدام filter
// ========================================

function analyzeMercy() {

    // استخراج الطلاب الذين متوسطهم من 40 إلى 49

    const studentsInMercy = studentsList.filter(function(student) {

        const average = student.calculateAverage();

        return average >= 40 && average <= 49;

    });


    // إضافة 5 درجات رأفة باستخدام map

    const mercyResults = studentsInMercy.map(function(student) {

        const oldAverage = student.calculateAverage();

        const newAverage = oldAverage + 5;

        return {

            id: student.id,

            name: student.name,

            oldAverage: oldAverage,

            newAverage: newAverage

        };

    });


    // جمع المتوسطات الجديدة باستخدام reduce

    const totalNewAverages = mercyResults.reduce(function(sum, student) {

        return sum + student.newAverage;

    }, 0);


    // الحماية من القسمة على صفر

    const mercyAverage = mercyResults.length > 0
        ? totalNewAverages / mercyResults.length
        : 0;


    // طباعة النتائج في Console

    console.log("========== لجنة الرأفة ==========");

    console.log("الطلاب الذين شملتهم الرأفة:");

    console.table(mercyResults);

    console.log(
        "عدد الطلاب المتعثرين:",
        mercyResults.length
    );

    console.log(
        "متوسط درجاتهم بعد الرأفة:",
        mercyAverage.toFixed(2)
    );

}


// ========================================
// 5. عرض تقرير الطالب على الموقع
// ========================================

function displayStudentResult(student) {

    const average = student.calculateAverage();

    const total = student.grades.reduce(function(sum, grade) {

        return sum + grade;

    }, 0);

    const grade = student.getGrade(average);

    const result = student.getFinalResult();

    const resultBody = document.getElementById("resultBody");

    // إنشاء صفوف التقرير

    const reportRows = [

        ["رقم الجلوس", student.id],

        ["اسم الطالب", student.name],

        ["إجمالي الدرجات", total],

        ["المتوسط", average.toFixed(2)],

        ["التقدير", grade],

        ["الحالة", result]

    ];

    // مسح التقرير القديم

    resultBody.innerHTML = "";

    // إضافة بيانات التقرير

    reportRows.forEach(function(item) {

        const row = document.createElement("tr");

        const heading = document.createElement("th");

        const value = document.createElement("td");

        heading.textContent = item[0];

        value.textContent = item[1];

        if (item[0] === "الحالة") {

            value.className = result === "ناجح"
                ? "success"
                : "review";

        }

        row.appendChild(heading);

        row.appendChild(value);

        resultBody.appendChild(row);

    });

    // إظهار التقرير

    document.getElementById("studentResult").style.display = "block";

}


// ========================================
// 6. استقبال بيانات الطالب من الفورم
// ========================================

const form = document.getElementById("studentForm");

form.addEventListener("submit", function(event) {

    // منع إعادة تحميل الصفحة

    event.preventDefault();


    // قراءة البيانات من HTML

    const id = Number(
        document.getElementById("studentId").value
    );

    const name = document.getElementById("studentName").value.trim();

    const grade1 = Number(
        document.getElementById("grade1").value
    );

    const grade2 = Number(
        document.getElementById("grade2").value
    );

    const grade3 = Number(
        document.getElementById("grade3").value
    );

    const attendance = Number(
        document.getElementById("attendance").value
    );


    // إنشاء كائن جديد من Student

    const newStudent = new Student(

        id,

        name,

        [grade1, grade2, grade3],

        attendance

    );


    // إضافة الطالب إلى المصفوفة الرئيسية

    studentsList.push(newStudent);


    // عرض تقرير الطالب على الموقع

    displayStudentResult(newStudent);


    // تحديث تقارير التكليف في Console

    displayStudentsReport();

    analyzeMercy();

});


// ========================================
// 7. تشغيل تقارير الطلاب عند فتح الموقع
// ========================================

displayStudentsReport();

analyzeMercy();
