
/*about of story*/
const $storyLarrow = document.querySelector(".push-left-btn");
const $storyRarrow = document.querySelector(".push-right-btn");
const $storySlide = document.querySelector(".story-el-container");
const $storyContainer = document.querySelector(".left-story");
const dragContainer = document.querySelector(".newPostPop");
var leftValue = 0;
var commentToggle = false;


$storyRarrow.addEventListener("click",()=>{
    const slideCSS = getComputedStyle($storySlide);
    const slideWidthValue = slideCSS.getPropertyValue("width");
   
   if(slideWidthValue.substring(0,slideWidthValue.length-2)>leftValue){
       
    leftValue += 250;
    $storySlide.style.left =`${-leftValue}px`;

    if( leftValue > slideWidthValue.substring(0,slideWidthValue.length-2)-600){

        $storyRarrow.classList.add("pasive");
        $storyRarrow.classList.remove("active");
        
        let sliderWidthValue = slideWidthValue.substring(0,slideWidthValue.length-2)-600;
        
      
        
        $storySlide.style.left = `${-(sliderWidthValue)}px`;
       
    }
   }
   

   if(leftValue>=250){
    $storyLarrow.classList.remove("pasive");
    $storyLarrow.classList.add("active");
    
    }
  
   
})

$storyLarrow.addEventListener("click",()=>{
  
   
   if(leftValue>=250){
    leftValue -= 250;
    $storySlide.style.left =`${-leftValue}px`;
   }


   if(leftValue<250){
    $storyLarrow.classList.add("pasive");
    $storyLarrow.classList.remove("active");
    }
    
    if($storyRarrow.classList.contains("pasive")){
      
        $storyRarrow.classList.remove("pasive");
        $storyRarrow.classList.add("active");
    }
})
/*about of story*/


/*about of popup*/ 
const $p_popup_bg = document.querySelector(".bg-popup");
const $p_popup_container = document.querySelector(".post-popup-container");
const $addPost_btn = document.querySelector(".addPost");
const $popupClose_btn = document.querySelector(".post-pop-close");

const postTextArea = document.querySelector(".post-textarea");
const showChecker = document.querySelector(".postshowLengt");  

$addPost_btn.addEventListener("click",(e)=>{
    e.preventDefault();
    $p_popup_container.style.display = "block";
    document.body.height = "100%";
    document.body.overflow = "hidden";
    $addPost_btn.style.marginTop = "-50px";
    document.body.style.overflow = "hidden";
    setTimeout(()=>{
    //ALTTAKİ SATIRI AÇ
    let dragContainerW;
    let dragContainerH;
    if(window.outerHeight<1000)
    {
        dragContainerW="700px";
        dragContainerH = "650px";
    }else{
        dragContainerW="720px";
        dragContainerH = "700px";
    }
    dragContainer.style.width = dragContainerW;
    dragContainer.style.height = dragContainerH;
    },1)
    
})
$popupClose_btn.addEventListener("click",()=>{
    $p_popup_container.style.display = "none";
    document.body.style.overflow = "visible";
    delImage()
})
$p_popup_bg.addEventListener("click",()=>{
    document.body.style.overflow = "visible";
    $p_popup_container.style.display = "none";
    delImage()
})

/*about of popup*/ 

/*POPUP DRAG ITEMS */

const popupFileIcon = document.querySelector(".popUp-fileIcon");
const popup_Input  = document.querySelector("#popup-input");
const pPopContent = document.querySelector(".p-popup-content");
const popupInner = document.querySelector(".p-popup-inner");
const postUuserImg = document.querySelector(".post-userImg");
const postBack = document.querySelector(".postBack");
const postNext = document.querySelector(".postNext");
const postSettings = document.querySelector(".post-setting-container");



dragContainer.addEventListener("dragover",(e)=>{
    e.preventDefault();
})

dragContainer.addEventListener("drop",(e)=>{
    
   e.preventDefault();
    
    
    var reader = new FileReader();
    reader.readAsDataURL(e.dataTransfer.files[0])
    
    var fileType = e.dataTransfer.files[0].type;
    let checkFile = ["image/jpeg", "image/jpg", "image/png"];
    if(checkFile.includes(fileType)){
        reader.onload = function(){
            dragContainer.style.transition = "all 450ms";
            //Kullanıcıdıan alınan resim
            var imageSource = reader.result;
            getImage(imageSource)
            

            //paylaşa basınca olucaklar 
            let nextIndex = 0;


            function addPostWay(){
                if(nextIndex==0){
                    //post ayarları
                    if(window.outerHeight<1000){
                        var dragContainerWW = "980px"
                    }else{
                        var dragContainerWW = "1017px"
                    }
                    
                    dragContainer.style.width = dragContainerWW;
                    postSettings.style.display = "inline-block";
                    postNext.textContent = "Paylaş";
                    postUuserImg.style.borderBottomRightRadius = "0px";
                    nextIndex++;
                    console.log(nextIndex);
                    
                }else if(nextIndex==1){
                   //Post atar
                   
                   delImage(); 
                    sharePost(imageSource,postTextArea.value,commentToggle);
                    
                    
                    
                    postTextArea.value="";
                    document.body.style.overflow = "visible";
                    $p_popup_container.style.display = "none";
                    nextIndex=0;
                    console.log(nextIndex);
                    postNext.removeEventListener("click",addPostWay);
                    
                }
            }
            postNext.addEventListener("click",addPostWay);


        }
    }
    
})


//imagei ekleyen ve içeri silen func ve geri getiren
function getImage(source){
    
    postUuserImg.style.display = "block";
    popupInner.style.display = "none";
    //normal padding 24px
    pPopContent.style.padding = "0px";
    setTimeout(()=>{
        postUuserImg.style.opacity = "1";
    },10)
   
    postUuserImg.setAttribute("src",source);
    postUuserImg.setAttribute("width","100%");
    postUuserImg.setAttribute("height","100%");
    postBack.style.visibility = "visible";
    postNext.style.visibility = "visible";
}
function delImage(){
    
    postUuserImg.style.display = "none";
    popupInner.style.display = "flex";
    //normal padding 24px
    pPopContent.style.padding = "24px";
    postUuserImg.setAttribute("src","#");
    postUuserImg.style.opacity = "0.1";
    postBack.style.visibility = "hidden";
    postNext.style.visibility = "hidden";
    popupFileIcon.style.color = "#000";
    popup_Input.value = "";
    postSettings.style.display = "none";
    postNext.textContent = "İleri";
    postUuserImg.style.borderBottomRightRadius = "13px";
}
//--------------------
dragContainer.addEventListener("dragenter",(e)=>{
    e.preventDefault();
    popupFileIcon.style.color = "#0095f6";
})
dragContainer.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    popupFileIcon.style.color = "#000";
})


//-----------------------input ile img alma 
popup_Input.addEventListener("change",()=>{
    
    let readerM = new FileReader();
    
    readerM.readAsDataURL(popup_Input.files[0]);
    
    readerM.onload = function(){
        
        dragContainer.style.transition = "all 450ms";
        var imageSource = readerM.result;
        
        let nextIndex = 0;
        getImage(imageSource);
        function addPostWay(){
            if(nextIndex==0){
                //post ayarları
                if(window.outerHeight<1000){
                    var dragContainerWW = "980px"
                }else{
                    var dragContainerWW = "1017px"
                }
                
                dragContainer.style.width = dragContainerWW;
                postSettings.style.display = "inline-block";
                postNext.textContent = "Paylaş";
                postUuserImg.style.borderBottomRightRadius = "0px";
                nextIndex++;
                console.log(nextIndex);
                
            }else if(nextIndex==1){
               //Post atar
               
               delImage(); 
                sharePost(imageSource,postTextArea.value,commentToggle);
                
                
                
                postTextArea.value="";
                document.body.style.overflow = "visible";
                $p_popup_container.style.display = "none";
                nextIndex=0;
                console.log(nextIndex);
                postNext.removeEventListener("click",addPostWay);
                
                
            }
        }
        postNext.addEventListener("click",addPostWay);
     
    }
})

//POPIUP GO BACK

postBack.addEventListener("click",()=>{
    $p_popup_container.style.display = "none";
    delImage();
})
/*POPUP DRAG ITEMS */
/*POST TEXT AREA SHOW MAX LENGT*/


postTextArea.addEventListener("keypress",()=>{
    let length = postTextArea.value.length;
    showChecker.innerHTML = length; 
})

/*NOT POST HAZILRAMA KISMININ GENİŞLİĞİ VE UZUNLUGU FARKLI ÇÜNKÜ JSDEN ADDPOST A TIKALDIGINDA WİDTH,HEİGHT DÜŞÜREN ŞEYİ YORUMA ALDIM 
VE post-setting-container DİSPLAY YAPILICAK
*/ 

/*post advanced settings toggle section*/ 

const openSettings = document.querySelector(".advancedSetIcon");
const advancedSettings = document.querySelector(".advancedSettings");
const advancedSettings_svg = document.querySelector(".advancedSettings svg");
const closeCommentToggleInner = document.querySelector(".closeCommentToggleInner");
const closeCommentToggleBTN = document.querySelector(".closeCommentToggleBTN");

openSettings.addEventListener("click",()=>{
 
advancedSettings.classList.toggle("setActive");
advancedSettings_svg.classList.toggle("setActiveSVG");

})

closeCommentToggleInner.addEventListener("click",()=>{
    if(commentToggle ==false){
        commentToggle = true;
        console.log(commentToggle);
    }else{
        commentToggle = false;
         console.log(commentToggle);
    }

  
closeCommentToggleBTN.classList.toggle("comment-closed-bg");
closeCommentToggleInner.classList.toggle("comment-closed");
})

/*SHARE POST */

function sharePost(image,text,comment){
    
    if(comment==true){
        var close = "disabled";
    }

    let postSection = document.createElement("div");
    
    postSection.innerHTML = ` <div class="post-container">
    <div class="post-details">

        <div class="post-owner">
        <img src="img/32.jpg" alt="" width="35px" style="border-radius: 50%; margin-right: 15px;">
        <div class="main-profile-name">ufakbarista <br>
            <span class="post-audio">Original Audio</span>
        </div>
        </div>

        <div class="post-details-btn">
        <svg aria-label="Diğer seçenekler" class="_8-yf5" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
        </div>
    </div>
    <div class="post-img">
        <img src="${image}" width="100%"  alt="">
    </div>
    <div class="post-icons">
        <div class="post-icons-left">
            <svg aria-label="Beğen" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
            <svg aria-label="Yorum Yap" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
            <svg aria-label="Gönderi Paylaş" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
        </div>
        <div class="post-icons-right">
            <svg aria-label="Kaydet" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
        </div>
       
    </div>
    <div class="post-stats">
        <div class="main-profile-name" style="margin-bottom: 5px;">475 beğenme</div>
        <div class="stats-description"> <span class="main-profile-name">ufakbarista</span> <span class="post-description-text">${text}</span></div>
        <div class="stats-comment-count">3 yorumu gör</div>
        <div class="stats-date">7 SAAT ÖNCE</div>
    </div>
    <div class="post-comment">
        <div style="margin: 10px 16px;">
            <svg aria-label="İfade Simgesi" class="_8-yf5 " color="#262626" fill="#262626" height="24"  role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
        </div>
        <input class="comment-input" placeholder="Yorum ekle..." ${close}>
        
        <div class="comment-share-btn">Paylaş</div>
        
    </div>

</div>`

document.querySelector(".left-post").appendChild(postSection);

advancedSettings.classList.remove("setActive");
advancedSettings_svg.classList.remove("setActiveSVG");
closeCommentToggleBTN.classList.remove("comment-closed-bg");
closeCommentToggleInner.classList.remove("comment-closed");
commentToggle = false;

}