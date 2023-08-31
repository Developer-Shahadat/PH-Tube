const handleCategory = async () => {
    const res = await fetch ('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    // console.log(data.data);
    const tabContainer = document.getElementById('tab-container');
    data.data.slice(0,4).forEach((category)=>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="tabs ">
            <btn onclick = "handleLoadVideo('${category.category_id}')" class="btn hover:bg-red-400">${category.category}</btn>
        </div>
        `
        tabContainer.appendChild(div);
    });
}

const handleLoadVideo = async (dataLoadId) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/videos/category/${dataLoadId}`);
    const data = await res.json();
    console.log(data.data);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ``
    data.data.forEach((dynamicData)=>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-72 bg-base-100 shadow-xl mt-4 pb-8">
            <figure><img class= "h-[162px] w-[266px]" src= ${dynamicData?.thumbnail} /></figure>
            <div class="mt-2 ">
                
                <div class="avatar-group ">
                    <div class="avatar  ">
                        <div class="w-10">
                        <img src= ${dynamicData.authors[0].profile_picture} />
                    </div>
                </div>

                <h2 class="text-center mt-3 mx-2 font-medium">${dynamicData?.title}</h2>
            </div>
            <div class ="flex"> 
            <p class="mx-14 font-medium text-gray-400">${dynamicData.authors[0].profile_name}</p>
            <p>${dynamicData?.authors[0].verified? "<img class='w-6' src='icons/check.jpg'/>" :  "" }</p>
            </div>
            <p class ="mx-14 text-sm  text-gray-400 font-medium" >${dynamicData.others.views}  views</p>
            
        </div>
        `
        
        cardContainer.appendChild(div);
        
    });
    
}
handleCategory();
handleLoadVideo("1000","1001","1003")