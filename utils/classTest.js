const objTest = {
  name: "gg",
  date: "now",
};
class User {
  constructor(name, date) {
    (this._name = name), (this._date = date);
    this.add = (a, b) => {
      return a + b;
    };
  }

  full() {
    return this._name + this._date;
  }
}

const checkAge = (user, age) => {
  user.age = age;
  if (age < 18) {
    console.log(`This user is not allowed below ${age}`);
  } else {
    return user;
  }
};

const user1 = new User("toto", "tomorow");
const user2 = new User("alex", "yesterday");
const user3 = checkAge(new User("pierre", "before"), 16);
const user4 = checkAge(new User("mathieu", "before"), 24);

user2._name = "alexia";

console.log(objTest);
console.log(user1);
console.log(user2);
console.log(user2.full());
console.log(user1.add(5, 10));
console.log(user3);
console.log(user4);
