const roles = {
	admin: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
	student: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
	lector: "https://cdn-icons.flaticon.com/png/512/3048/premium/3048709.png?token=exp=1657867214~hmac=dac937c5dc999622fcaf241aeb27c349"
};

const gradation = {
	20: "satisfactory",
	55: "good",
    85: "very-good",
	100: "excellent",
};

function getGradation(points) {
    for(let key in gradation) {
        if(points <= key) {
            return points = gradation[key];
        }
    }
}

class User {
    constructor(name, age, img, role, courses) {
        this.name = name;
        this.age = age;
        this.img = img;
        this.role = role;
        if(courses) this.courses = courses;
    }

    render() {
        let userInfo = [];
        userInfo.push(
            `<div class="user__info">
                <div class="user__info--data">
                    <img src="${this.img}" alt="${this.name}" height="50">
                    <div class="user__naming">
                        <p>Name: <b>${this.name}</b></p>
                        <p>Age: <b>${this.age}</b></p>
                    </div>
                </div>
                <div class="user__info--role student">
                    <img src="${roles[this.role]}" alt="${this.role}" height="25">
                    <p>${this.role}</p>
                </div>
            </div>`
        );
        return userInfo;
    }
}

class Admin extends User {
    constructor(name, age, img, role, courses) {
        super(name, age, img, role, courses)
    }

    renderCourses() {
        if(this.courses) {
            let userCourses = [];
            this.courses.forEach(
                function(course) {
                    userCourses.push(
                        `<div class="user__courses--course admin">
                            <p>Title: <b>${course.title}</b></p>
                            <p>Admin's score: <span class="${getGradation(course.score)}">${getGradation(course.score)}</span></p>
                            <p>Lector: <b>${course.lector}</b></p>
                        </div>`
                    );
                }
            )
            return (`<div class="user__courses admin--info">${userCourses.join("")}</div>`);
        } else {
            return ""
        }
    }
}

class Lector extends User {
    constructor(name, age, img, role, courses) {
        super(name, age, img, role, courses)
    }

    renderCourses() {
        if(this.courses) {
            let userCourses = [];
            this.courses.forEach(
                function(course) {
                    userCourses.push(
                        `<div class="user__courses--course lector">
                            <p>Title: <b>${course.title}</b></p>
                            <p>Lector's score: <span class="${getGradation(course.score)}">${getGradation(course.score)}</span></p>
                            <p>Average student's score: 
                                <span class="${getGradation(course.studentsScore)}">${getGradation(course.studentsScore)}</span>
                            </p>
                        </div>`
                    );
                }
            )
            return (`<div class="user__courses admin--info">${userCourses.join("")}</div>`);
        }
    }
}

class Student extends User {
    constructor(name, age, img, role, courses) {
        super(name, age, img, role, courses)
    }

    renderCourses() {
        if(this.courses) {
            let userCourses = [];
            this.courses.forEach(
                function(course) {
                    userCourses.push(
                        `<p class="user__courses--course student">
                            ${course.title} <span class="${getGradation(course.mark)}">${getGradation(course.mark)}</span>
                        </p>`
                    );
                }
            )
            return (`<div class="user__courses">${userCourses.join("")}</div>`);
        } else {
            return ""
        }
    }
}









const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "https://cdn-icons-png.flaticon.com/512/1388/1388863.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "https://cdn-icons-png.flaticon.com/512/1388/1388863.png",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "https://cdn-icons-png.flaticon.com/512/1388/1388863.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "https://cdn-icons-png.flaticon.com/512/1388/1388863.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "https://cdn-icons-png.flaticon.com/512/1388/1388863.png",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "https://cdn-icons-png.flaticon.com/512/1388/1388863.png",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
]

users.forEach(
    function(user) {
        if(user.role == "student") {
            let newUser = new Student(user.name, user.age, user.img, user.role, user.courses);
            document.write(
                `<div class="user">${newUser.render()}${newUser.renderCourses()}</div>`
            )
        } else if(user.role == "lector") {
            let newUser = new Lector(user.name, user.age, user.img, user.role, user.courses);
            document.write(
                `<div class="user">${newUser.render()}${newUser.renderCourses()}</div>`
            )
        } else if(user.role == "admin") {
            let newUser = new Admin(user.name, user.age, user.img, user.role, user.courses);
            document.write(
                `<div class="user">${newUser.render()}${newUser.renderCourses()}</div>`
            )
        };

    }
)