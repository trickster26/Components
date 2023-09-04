let paginationDiv = document.querySelectorAll('.number');
var images = document.querySelectorAll(".image-container");
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');
    
const totalPages = 5; 
const numPagesToShow = 3; 
var currentPage = 1; 

const paginationElement = document.getElementById('pagination');
var currentIndex ;;
function generatePagination() {
        // console.log("start ",currentPage);
        // Calculate start and end page numbers to display
        let startPage = Math.max(currentPage - Math.floor(numPagesToShow / 2), 1);
        let endPage = startPage + numPagesToShow - 1;

        // Adjust if the end page is greater than the total number of pages
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - numPagesToShow + 1, 1);
        }



        // const paginationLinks = [];
        // for (let i = startPage; i <= endPage; i++) {
        //     var anch = document.createElement('a');
        //     anch.setAttribute('data-page',`${i}`);
        //     anch.innerText=i;
        //     paginationElement.appendChild(anch);
        //     paginationLinks.push(`<a href="#" class=""  data-page="${i}">${i}</a>`);
        //     paginationLinks.push(anch);
        // }
        // paginationElement.innerHTML="";
        // paginationElement.innerHTML = paginationLinks.join(' ');


        // Generate the pagination links
        paginationElement.innerHTML = '';

        for (let i = startPage; i <= endPage; i++) {
            const link = document.createElement('a');
            link.innerText = i;
            link.dataset.page = i;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = parseInt(link.getAttribute('data-page'));
                generatePagination();
            });
          
          
            console.log(link);
            paginationElement.appendChild(link);
        }

        // Giving the styling to active Page Or Link
        let anch = paginationElement.querySelectorAll('a');
              console.log(anch);
              anch.forEach((el)=>{
                if(el.innerText == currentPage){
                  console.log("true");
                //   el.style.color = 'green';
                el.classList.add('active');
                }
              })


        // Add click event listeners to the pagination links
        const links = paginationElement.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                //e.preventDefault();
                console.log("data property" ,link.getAttribute('data-page'));
                let paginataionLimit = 10;
                
                // link.style.color = 'green';
                // link.classList.add("active")
                // console.log("color is :-",link.style.color);
                currentIndex = currentPage;
                let startIndex = ((currentIndex-1)*paginataionLimit);
                let lastIndex = currentIndex*paginataionLimit-1;
                console.log("activeLink",link)
                for(let i = 0; i<images.length; i++){
                    images[i].setAttribute('style',"display:none");
                }
                for(let i = startIndex; i<= lastIndex; i++){
                    // console.log(images[i]);
                    images[i].setAttribute('style',"display:block");
                }
                currentPage = parseInt(link.getAttribute('data-page'));
                generatePagination();

                    
            });
        });
}

        

// Handling prev abd Next Button
// console.log(prevBtn)
prevBtn.disabled = currentPage == 1;
nextBtn.disabled = currentPage == totalPages;
prevBtn.addEventListener('click', ()=>{
    if( currentPage > 1 ) {
        currentPage-=1;
        generatePagination();
    }})
nextBtn.addEventListener("click",()=> {
    if( currentPage <totalPages && currentPage>0) {
        currentPage+=1;
        generatePagination();
    }})

window.addEventListener('click',()=>{
    let paginataionLimit = 10;
    currentIndex = currentPage;
    let startIndex = ((currentIndex-1)*paginataionLimit);
    let lastIndex = currentIndex*paginataionLimit-1;

    for(let i = 0; i<images.length; i++){
        images[i].setAttribute('style',"display:none");
    }
    for(let i = startIndex; i<= lastIndex; i++){
        // console.log(images[i]);
        images[i].setAttribute('style',"display:block");
    }

    prevBtn.disabled = currentPage == 1;
    nextBtn.disabled = currentPage == totalPages;
    // console.log(currentIndex,currentPage);
})

generatePagination();

// let ybl = [];

// let loadImg=async()=>{
//     for (let index = 0; index < 50; index++) {
//         let response = await fetch("https://source.unsplash.com/random", { 
//         method: "GET",
//             });
        
//         ybl.push(response.url);
//         console.log(ybl);        
//     }
// }
// document.addEventListener("DOMContentLoaded", async(event) => {
//     links.forEach( link =>{
//         link.style.color="red";
//     }
// )
    
    // await loadImg();
    // console.log(ybl);
    // images = document.querySelectorAll('img');

    // images.forEach((img,i)=>{
    // img.setAttribute('src',`${ybl[i]}`)
    // }) 
// });

// images.forEach((img,i)=>{
//     i+=1
//         img.setAttribute('src',`./assets/images/image-${i}.jpg`)
//         }) 