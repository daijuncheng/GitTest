// 1 先构造一组初始数据
// 机构 
let orgs = [
    { "id": "1", "name": "壹基金" },
    { "id": "2", "name": "慈济基金" },
    { "id": "3", "name": "宋庆龄基金" },
]

let data = [
    { id: 1, "pname": "甄子丹", "orgName": "壹基金", "money": "40000", "date": "2013-01-19" },
    { id: 2, "pname": "成龙", "orgName": "慈济基金", "money": "40000", "date": "2013-01-19" },
    { id: 3, "pname": "周星驰", "orgName": "慈济基金", "money": "40000", "date": "2013-01-19" },
    { id: 4, "pname": "马云", "orgName": "宋庆龄基金", "money": "40000", "date": "2013-01-19" },
    { id: 5, "pname": "马化腾", "orgName": "壹基金", "money": "40000", "date": "2013-01-19" },
    { id: 6, "pname": "马化腾", "orgName": "壹基金", "money": "40000", "date": "2013-01-19" },
]
let pageNumber = 5
let page = 0
let max = Math.ceil(data.length / pageNumber)


// 绑定dom
let $org = $('select')
let $tbody = $('tbody')
let $add = $('#btnAdd')
let $search = $('#btnSearch') 


//2 绑定事件
//a 渲染表格
renter(data)

// b 渲染机构
renterOrgs(orgs)

//c 绑定新增事件 
$add.on('click', add)

//d 绑定删除的事件
$tbody.on('click', '#delete', dele)

// e 绑定修改事件
$tbody.on('click', '#alter', alt)

//f 绑定确认修改事件
$tbody.on('click', '#yes', conf)

// g 绑定取消修改事件
$tbody.on('click', '#no', function () {
    renter(data)
})

// h // 点击下一页函数
$('#btnNext').on('click', next)

// i // 8 绑定查询事件
$search.on('click', query)



//3 创建分页函数
function pages(data) {
    // 页数等于 length
    max = Math.ceil(data.length / pageNumber)
    if (max <= 0) {
        max = 1
    }
    let pagefirst = page * pageNumber
    const newData = data.slice(pagefirst, pagefirst + pageNumber)
    if (newData.length <= 0 && page > 0) {
        page--

        pages(data)
    }
    return newData
}


function renter(data) {

    if (!pages(data)) {
        return
    }
    const newdata = pages(data)
    $tbody.empty()
    for (let i = 0; i < newdata.length; i++) {
        let item = newdata[i]
        let index = page * pageNumber + i
        const tr = $(`
            <tr data-id="${index}">
                <td>${item.id}</td>
                <td>${item.pname}</td>
                <td>${item.orgName}</td>
                <td>${item.money}</td>
                <td>${item.date}</td>
                <td>
                    <a href="#" id="alter">改</a> 
                    <a href="#" id="delete">删</a>
                </td>
            </tr>
        `)
        $tbody.append(tr)
    }

    $('#spanPageIndex').text(page + 1)
    $('#spanPageCount').text(max)
}
function renterOrgs(orgs) {
    for (const item of orgs) {
        const el = $(`
        <option value="${item.name}">${item.name}</option>
        `)
        $org.append(el)
    }
}

//4 删除函数 
function dele() {
    let falg = confirm('请确认是否删除')
    if (!falg) return
    // 获取父亲的id
    const id = $(this).parent().parent().children().eq(0).text()
    const index = data.findIndex(item => {
        return item.id == id
    })
    for (let i = 0; i < data.length; i++) {
        if (data[i].id > id) {
            data[i].id--
        }
    }
    data.splice(index, 1)
    let value = $('#selSearchOrg').val()
    if (value === '全部') {
        renter(data)
        return
    }
    const newData = data.filter(item => {
        return item.orgName === value
    })
    renter(newData)
}



//5 修改时的函数
function alt() {
    // 获取父亲的id
    if ($('#yes').length !== 0) {
        let tr = $('#yes').parent().parent()
        let id = Number(tr.children().eq(0).text())

        const index = data.findIndex(item => {
            return item.id == id
        })
        item = data[index]
        console.log(item);
        tr.html(`
                <td>${id}</td>
                <td>${item.pname}</td>
                <td>${item.orgName}</td>
                <td>${item.money}</td>
                <td>${item.date}</td>
                <td>
                    <a href="#" id="alter">改</a> 
                    <a href="#" id="delete">删</a>
                </td>
           `)
    }
    const tr = $(this).parent().parent()
    const id = tr.children().eq(0).text()
    const pname = tr.children().eq(1).text()
    const orgName = tr.children().eq(2).text()
    const money = tr.children().eq(3).text()
    const date = tr.children().eq(4).text()
    tr.html(`
                    <td>${id}</td>
                    <td><input type="text" value="${pname}"></td>
                    <td> <select name="" id=""></select></td>
                    <td><input type="text" value="${money}"></td>
                   
                    <td><input type="text" class="demo-input" placeholder="请选择日期" id="timer2" value="${date}"></td>
                    <td>
                    <button id="yes">确认</button>
                    <button id="no">取消</button>
                    </td>
        `)

    for (const item of orgs) {
        let el
        if (item.name === orgName) {
            el = $(`
            <option selected ">${item.name}</option>
            `)
        } else {
            el = $(`
                <option ">${item.name}</option>
                `)
        }
        tr.children().eq(2).children().append(el)
    }
    lay('#version').html('-v' + laydate.v);

    //执行一个laydate实例
    laydate.render({
        elem: '#timer2' //指定元素
    });
}


//6 确认时的函数confirm
function conf() {
    // 就重新渲染一遍函数
    const tr = $(this).parent().parent()
    const id = Number(tr.children().eq(0).text())
    console.log(id);
    const pname = tr.children().eq(1).children().val()
    const orgName = tr.children().eq(2).children().val()
    const money = tr.children().eq(3).children().val()
    const date = tr.children().eq(4).children().val()
    let newData = { id: id, pname: pname, orgName: orgName, money: money, date: date }
    data[id - 1] = newData
    let value = $('#selSearchOrg').val()
    if (value === '全部') {
        renter(data)
        return
    }

    const newData2 = data.filter(item => {
        return item.orgName === value
    })
    renter(newData2)
}


//7 新增数据函数 add
function add() {
    const pname = $('#txtName').val()
    const orgName = $('#selAddOrg').val()
    if (orgName == -1) {
        return alert('请选择机构')
    }
    const money = $('#txtMoney').val()
    const date = $('#timer').val()
    const newItem = { id: data.length + 1, pname, orgName, money, date }
    data.push(newItem)
    page = Math.ceil(data.length / pageNumber) - 1
    renter(data)
}


//8 查询函数
function query() {
    let value = $('#selSearchOrg').val()
    if (value === '全部') {
        renter(data)
        return
    }

    const newData = data.filter(item => {
        return item.orgName === value
    })
    renter(newData)
}

//9 下一页函数 

function next() {
    page++
    if (page >= max) {
        page = max - 1
        alert('已经到最后一页了')
        return false
    } else if (page < 0) {
        page = 0
        alert('已经是第一页了')
        return
    }
    renter(data)
}
//10 点击上一页
$('#btnPre').on('click', prev)
// 上一页函数
function prev() {
    if (page >= max) {
        page = max - 1
        alert('已经到最后一页了')
        return false
    } else if (page <= 0) {
        page = 0
        alert('已经是第一页了')
        return
    }
    page--
    renter(data)
}

// 设置跳转事件
$('#jump').on('click', fump
)

// 输入数字跳转事件函数
function fump() {
    let num = $('#number').val()
    if (num <= 0 || num > max) {
        alert('请输入1-' + max + '之间的值')
        return
    }
    page = Number(num) - 1
    renter(data)
}