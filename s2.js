// Initialize the Variables
var currentPage = 1
var data = null

// XHR Object
var request = new XMLHttpRequest()

// Open the Connection
request.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json")
  
// Sending a Connection
request.send()

// Anonymous Function
request.onload = function()
{
    // Converting JSON String to Objects
    data = JSON.parse(request.response)

    var str = '<button class="bold" onclick="first()">&lt;&lt; First</button>\n<button class="bold" onclick="prev()">&lt; Previous</button>'
    for(let i=0;i<data.length;i++)
    {
        var tag = ""
        if(i==0)
            pageBtn = '<button id="b1" onclick="selectDisplay(1)" class="active">1</button>'
        else
            pageBtn = `<button id="b${i+1}" onclick="selectDisplay(${i+1})">${i+1}</button>`     
        
        str += pageBtn
    }
    str += '<button class="bold" onclick="next()">Next &gt;</button>\n<button class="bold" onclick="last()">Last &gt;&gt;</button>'

    var section = document.getElementById("section")
    section.innerHTML = str

    var content = document.getElementById("content")
    content.innerText = obj2str(data[0])
}

function obj2str(object)
{
    return "ID: "+object.id+"\n"+"Name: "+object.name+"\n"+"E-Mail: "+object.email;
}

function updateDisplay()
{
    var index = currentPage - 1

    // Display the Page Data
    var content = document.getElementById("content")
    content.innerText = obj2str(data[index])
    
    // Display the Page Number
    var display = document.getElementById("display")
    display.innerText = `change: ${currentPage}`

    // Erase the Previous Selection
    for(let i=1;i<=data.length;i++)
    {
        var btn = document.getElementById(`b${i}`)
        btn.classList.remove("active")    
    }

    // Change the Background of Selected Button
    var currentBtn = document.getElementById(`b${currentPage}`)
    currentBtn.classList.add("active")
}

// Display Function
function selectDisplay(num)
{
    if(num>=1 && num<=data.length)
    {  
        currentPage = num
        updateDisplay()
    }
}

function first()
{
    selectDisplay(1)
}

function last()
{
    selectDisplay(data.length)
}

function prev()
{
    selectDisplay(currentPage-1)
}

function next()
{
    selectDisplay(currentPage+1)
}

