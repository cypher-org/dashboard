
window.location.hash = "user"







setTimeout(()=>{
    document.getElementById("page").classList.remove("hidden")
    document.getElementById("loader").classList.add("hidden")
    document.getElementById("side-nav").style.height = window.innerHeight - 74  + "px"
    if ( window.innerWidth < 748){ 
        document.getElementById("side-nav").style.display = "none"
        document.getElementById("side-nav").style.width = window.innerWidth - 10  + "px"
    } else {
        document.getElementById("side-nav").style.width = "18.225em"
    }
},2500)


window.addEventListener("change",()=>{
    if ( window.innerWidth < 748){ 
        document.getElementById("side-nav").style.width = window.innerWidth - 10  + "px"
    } else {
        document.getElementById("side-nav").style.width = "18.225em"
    }
})



document.querySelectorAll("#contents ul li").forEach((value) => {
    value.classList.add("rounded-md")
    value.classList.add("hover:bg-teal-600", "transition", "ease-in-out", "delay-50")
    value.classList.add("p-3")
    value.classList.add("rounded-md")
    value.classList.add("rounded-md")
})
function toggleBar(id, target) {
    $(`#${target}`).slideToggle()
}





let auth = document.getElementById("body").dataset.auth


fetch(`/getuser/${auth}`)
    .then(response => response.json())
    .then(responseText => {
        guilds = responseText["guilds"];
        user = responseText["userinfo"]
        document.getElementById("selected").innerHTML =  user["username"]
        let icon = document.createElement("img");
        document.getElementById("doubleDropdownButton").appendChild(icon)
        icon.src = `https://cdn.discordapp.com/avatars/${user["id"]}/${user["avatar"]}.png`
        icon.classList.add("rounded-full", "h-10", "w-10", "inline")
        const list = document.createElement("li");
        icon = document.createElement("img");
        const anchor = document.createElement("a");
        list.appendChild(icon)
        list.appendChild(anchor)
        icon.src = `https://cdn.discordapp.com/avatars/${user["id"]}/${user["avatar"]}.png`
        list.dataset.id = user["id"]
        list.dataset.type = "user"
        list.dataset.name = user["username"]
        anchor.innerHTML =  user["username"]
        list.role = "button"
        anchor.classList.add("w-full", "pl-2")
        list.classList.add("p-5", "m-2")
        list.classList.add("hover:bg-gray-600/75", "transition", "ease-in-out", "delay-50","rounded-md")
        icon.classList.add("rounded-full", "h-10", "w-10", "inline")
        list.onclick = () => {
            toggleBar("", "doubleDropdown");
            document.getElementById("doubleDropdownButton").innerHTML = list.dataset.name
            document.getElementById("doubleDropdownButton").dataset.id = list.dataset.id
            location.href = href = "#user"
        }
        document.getElementById("guilds").appendChild(list)

        for (let i = 0; i < guilds.length; i++) {
            const list = document.createElement("li");
            const icon = document.createElement("img");
            const anchor = document.createElement("a");
            let avatar
            list.appendChild(icon)
            list.appendChild(anchor)
            if (guilds[i]["icon"] == null) {
                icon.src = `https://cdn.discordapp.com/icons/1060951644545744926/0765a8482135daf631f0f8329a0efdea.png`
                list.dataset.avatar = icon.src
            } else {
                icon.src = `https://cdn.discordapp.com/icons/${guilds[i]["id"]}/${guilds[i]["icon"]}.png`
                list.dataset.avatar = icon.src
            }
            list.onclick = () => {
                toggleBar("", "doubleDropdown");
                document.getElementById("selected").innerText = list.dataset.name 
                document.getElementById("doubleDropdownButton").dataset.id = list.dataset.id
                document.querySelector("#doubleDropdownButton img").src = list.dataset.avatar
                location.href = href = "#" +  list.dataset.id

            }
            list.dataset.id = guilds[i]["id"]
            list.dataset.name = guilds[i]["name"]
            anchor.innerHTML = guilds[i]["name"]
            list.role = "button"
            anchor.classList.add("w-full", "pl-2")
            list.classList.add("p-5", "m-2")
            list.classList.add("hover:bg-gray-600/75", "transition", "ease-in-out", "delay-50","rounded-md")
            icon.classList.add("rounded-full", "h-10", "w-10", "inline")
            document.getElementById("guilds").appendChild(list)
            
        }})


fetch('/user.html')
    .then(response => response.text())
    .then(html => {
        setTimeout(()=>{
            document.getElementById("page-setting").classList.remove("hidden")
            document.getElementById("loader-content").classList.add("hidden")
            document.getElementById('text').innerHTML = html;
        },3000)
    });
