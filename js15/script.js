const response = {
    data: [
      {
        username: "samuel",
        is_active: true,
        created_at: "2020-11-20T09:53:50.000000Z",
      },
      {
        username: "john",
        is_active: false,
        created_at: "2020-11-20T09:53:50.000000Z",
      },
      {
        username: "peter",
        is_active: false,
        created_at: "2020-11-20T09:53:50.000000Z",
      },
    ],
    meta: {
      paging: {
        current: 1,
        next: 2,
        prev: null,
        total: 14,
        per_page: 3,
      },
    },
  };

// 1

const {

    meta: {paging: {total}},

    data: [{is_active: isActive}]

} = response

// console.log(isActive)
// console.log(total)

// 2

const user = {
    name: "gabriel",
    surname: "brown",
    age: 17,
    height: 178,
  };

const { name, surname, ...parameters} = user

// console.log(parameters)

// 3

const max = (a, b) => {
    return a > b ? a : b;
  };

const maxNumber = (...numbers) =>{
    let max = 0

    numbers.forEach((num)=>{
        if(num > max){
            max = num
        }
    })
    return max
}

res = maxNumber(12, 31, 41, 15)
// console.log(res)

// 4

const createMessage = ({author = `Guest`, text = `Hello!`, reciever = `unknown`, time = new Date()}) => {
    return `From ${author} to ${reciever}: ${text} (${time.toLocaleDateString()})`;
};

const message = createMessage({
    reciever: "John",
    text: "Hi!",
});
  
//   console.log(message)

// 5

let str = "x1y 722a 333 a123v1n a55555a qwe1 1zxc";
let reg = /\w\d+\w/gi

// console.log(str.match(reg))

let str2 = `ex.ua, google.com, yandex.ru, site.com.ua, my-page.com`
let reg2 = /([a-z-_.]+.\w{2})/gi

// console.log(str2.match(reg2))

let str3 = `123456789123456789`
let reg3 = /(\d+){12}/gi

// console.log(str3.match(reg3))


