let galleryImages = document.querySelectorAll(".gallery-img"); //select all the images in gallery and put them in one array 
let getLatestOpenedImg; // declared variable 
let windowWidth = window.innerWidth; //select th browser's width

if(galleryImages){
    galleryImages.forEach(function(image, index){
        image.onclick = function(){
            let getElementCss = window.getComputedStyle(image); //to grab all the css property for each image on the css file
            let getFullImgUrl = getElementCss.getPropertyValue("background-image"); //get the image background property when its opned
            let getImgUrlPos = getFullImgUrl.split("/images/thumbnails/"); //get the url path
            let setNewImgUrl = getImgUrlPos[1].replace('")', ''); //to remove the unwanted things on the url path 
            
            getLatestOpenedImg = index + 1; // when we open an image it have an index value so we want move through each of the images 1 by 1
            let container = document.body; // select the full website body 
            let newImgWindow = document.createElement("div"); // when we click an image this will put it on and div tag (create a div for opening the image on it)
            container.appendChild(newImgWindow); // it append the created div tag with its opned image on the body of the website
            newImgWindow.setAttribute("class", "img-window"); // it set a class name for the new div tag which is (img-window)
            newImgWindow.setAttribute("onclick", "closeImg()"); //it sets an oneclick js event for the new div tag

            let newImg = document.createElement("img"); // it will create an img HTML element 
            newImgWindow.appendChild(newImg); // it puts the opned image to the div tag
            newImg.setAttribute("src", "images/" + setNewImgUrl); // it will set the src value each time we click an image
            newImg.setAttribute("id", "current-img"); // it will set an id for the opned image which is (current-img)

            newImg.onload = function(){ //an onload event
                let imgWidth = this.width; // select the opned image width
                let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80; //an math calculate to opnen the image clearly  

                //to go to the next image
                let newNextBtn = document.createElement("a"); // it will create a new a HTML element to create a button
                let btnNextText = document.createTextNode("Next"); // it will write a text for the created button
                newNextBtn.appendChild(btnNextText); // it will append the above text to the created button
                container.appendChild(newNextBtn); // it will append the button on the body
                newNextBtn.setAttribute("class", "img-btn-Next"); // it will append a class name for the created button
                newNextBtn.setAttribute("onclick", "changeImg(1)"); // it will append a onclick even to the btn to change the image on the screen
                newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;"; //it will change the margin of the button with the images width

                
                //To go back to the previouse Image (same work and property as above's button!)
                let newPreBtn = document.createElement("a");
                let btnPreText = document.createTextNode("Prev");
                newPreBtn.appendChild(btnPreText);
                container.appendChild(newPreBtn);
                newPreBtn.setAttribute("class", "img-btn-prev");
                newPreBtn.setAttribute("onclick", "changeImg(0)");
                newPreBtn.style.cssText = "left: " + calcImgToEdge + "px;";
            }
        }
    });
}

function closeImg(){ //it will close the opned image 
    document.querySelector(".img-window").remove(); //it will select the img-window class and remove it on the tag of the opned image
    document.querySelector(".img-btn-Next").remove(); //it will remove the NEXT button on the screen when the image was closed
    document.querySelector(".img-btn-prev").remove(); //it will remove the Prev button on the screen when the image was closed
}

function changeImg(changeDir){ //it will change the opned image when user click on th (Next/Prev) buttons
    document.querySelector("#current-img").remove(); //it will select the current opned image and remove its id 
    
    let getImgWindow = document.querySelector(".img-window"); // it will select the img-windows calss name 
    let newImg = document.createElement("img"); // it will create another img element
    getImgWindow.appendChild(newImg); //it will append the new created img to the opned window which is (.img-window)
    
    let calcNewImg; //declear a variable
    if(changeDir === 1){ // it will check if the user clicked on the (NEXT) btn
        calcNewImg = getLatestOpenedImg + 1;// it will loop through each image one by one when user using (NEXT) btn
        if(calcNewImg > galleryImages.length){ //this condition is for check if the user gots the latest image on the gallery
            calcNewImg = 1; //it will take the user back to the first img if the above condition is true
        } else if(changeDir === 0){ //it will check if the user clicked on the (Prev) btn
            calcNewImg = getLatestOpenedImg - 1; //if the above condition is right it will looping back through each images on gallery
            if(calcNewImg < galleryImages.length){ // this condition is for check if the user gots the first image on the gallery
                calcNewImg = galleryImages.length; //it will take the user back to the latest image on the gallery if the above condition is right
            }
        }
    }
    newImg.setAttribute("src", "images/img" + calcNewImg + ".jpg"); //it will change the image name on the path if the user take action on the (Next/Prev) btns 
    newImg.setAttribute("id", "current-img"); //it will append the current-id name again to the images one by one 

    getLatestOpenedImg = calcNewImg; //this will select the opned image div and replace the images one by one

    newImg.onload = function(){ //it will re size the btn possition by the width of images
        let imgWidth = this.width; //it will select the width of each opned image
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80; //an math calculate to opnen the image clearly  

        nextBtn = document.querySelector(".img-btn-Next"); //it will select the (next) btn on the opned div tag
        nextBtn.style.cssText = "right: " + calcImgToEdge + "px;"; //it will resize the possition of the btn by the width of images

        prevBtn = document.querySelector(".img-btn-prev"); //it will select the (Prev) btn on the Opned div tag
        prevBtn.style.cssText = "left: " + calcImgToEdge + "px;"; // it will resize the possition of the btn by the width of images
    }
}