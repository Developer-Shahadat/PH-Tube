let fetchVideo = []
const handleCategory = async () => {
    const res = await fetch ('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const tabContainer = document.getElementById('tab-container');
    data.data.slice(0,4).forEach((category)=>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="tabs">
            <btn onclick = "handleLoadData('${category.category_id}')" class="btn hover:bg-red-400">${category.category}</btn>
        </div>
        `
        tabContainer.appendChild(div);
    });
}


const handleLoadData = async (dataLoadId) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/videos/category/${dataLoadId}`);
    const data = await res.json();
    // console.log(data.data);
    const cardContainer = document.getElementById('card-container');
   
    cardContainer.innerHTML = ``;

    const container = document.getElementById('container')
        container.innerHTML = ""
    if(data.data.length === 0){
        const div = document.createElement('div');
        div.innerHTML =`
        <img class ="lg:ml-[550px] ml-[140px] md:ml-[300px]" src="icons/Icon.png" />
        <p class ="mt-2 font-semibold text-3xl">Oops!! Sorry, There is no <br> content here</p>
        `
        container.appendChild(div);
    }
    
    
    data.data.forEach((dynamicData)=>{
        const div = document.createElement('div');
        const postedDate = dynamicData?.others.posted_date;
       const postTotalMinutes = Math.floor( dynamicData?.others.posted_date / 60);

        const seconds = dynamicData?.others.posted_date % 60;
        const hours = Math.floor(postTotalMinutes / 60);
        const minutes = postTotalMinutes % 60;
            
        // console.log(hours,minutes);
        div.innerHTML = `
        <div class="card w-72 bg-base-100  mt-4 pb-8">
            <div class=" flex relative">
            <figure><img class="h-[162px] w-[290px] rounded-xl" src= ${dynamicData?.thumbnail} /></figure>
            <div class ="absolute mx-32 mt-28 w-36 bg-black rounded-lg text-white">
            <p class ="text-sm"> ${dynamicData?.others.posted_date? `${hours}hrs ${minutes}mins ago` :  ""} </p>
            </div>
            </div>
            <div class="mt-2 ">
                
                <div class="avatar-group ">
                    <div class="avatar ">
                        <div class="w-10">
                        <img src= ${dynamicData.authors[0].profile_picture} />
                    </div>
                </div>

                <h2 class="text-center mt-3 mx-2 font-medium">${dynamicData?.title}</h2>
            </div>
            <div class ="flex gap-2 item-center"> 
            <div> <p class="mx-14 font-medium text-gray-400">${dynamicData.authors[0].profile_name}</p></div>
            <span>${dynamicData?.authors[0].verified? "<img class='' src='icons/check-2.jpg'/>" :  "" }</span>
            </div>
            <p class ="mx-14 text-sm  text-gray-400 font-medium" >${dynamicData.others.views}  views</p>
            
        </div>
        `
        cardContainer.appendChild(div);
    });
   
}



handleCategory();
handleLoadData("1000","1001","1003")

