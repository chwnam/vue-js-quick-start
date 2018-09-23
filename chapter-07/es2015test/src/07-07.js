function Person(name, yearCount) {
    this.name = name;
    this.age = 0;

    var incrAge = function() {
        this.age++;
    };

    for(var i = 0; i < yearCount; ++i) {
        incrAge.apply(this);
    }
}

var p1 = new Person('홍길동', 20);
console.log(p1.name + '님의 나이: ' + p1.age);