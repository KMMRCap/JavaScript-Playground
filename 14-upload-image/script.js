const dragArea = document.querySelector('.drag-area');
const header = document.querySelector('header');
const button = document.querySelector('button');
const input = document.querySelector('input');
let file;


button.onclick = () =>{
    input.click();
}


input.addEventListener("change", function(){
    file = this.files[0];
    showImage();
    dragArea.classList.add('active');
})

dragArea.addEventListener('dragover', function(event){
    // console.log('فایل در حال وارد شدن است.')
    event.preventDefault()
    dragArea.classList.add('active');
    header.textContent = "انتشار برای بارگذاری پرونده"
})

dragArea.addEventListener('dragleave', function(){
    // console.log('فایل در حال خارج شدن است.')
    dragArea.classList.remove('active')
    header.textContent= "برای بارگذاری بکش و رها کن"
})


dragArea.addEventListener('drop', function(event){
    // console.log('عکس رها شد')
    event.preventDefault();
    file = event.dataTransfer.files[0];
    showImage()

})


function showImage(){
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if(validExtensions.includes(fileType)){
        let fileReader = new FileReader();
        fileReader.onload = ()=>{
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" />`;
            dragArea.innerHTML = imgTag
        }

        fileReader.readAsDataURL(file);
    }else{
       alert("فایل انتخابی عکس نیست لطفا عکس انتخاب کنید.")
       dragArea.classList.remove('active');
    }
}