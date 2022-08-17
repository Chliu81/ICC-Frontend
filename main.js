

function search(){
  const raw_tag = document.getElementById("answers").value;
  url = 'https://7c5adbk1af.execute-api.us-east-1.amazonaws.com/stage1/search?q=' + raw_tag
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    origin: '*',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
  .then((data)=>{
    const processed_obj = JSON.stringify(data);
    const obj = JSON.parse(processed_obj);
    var post_lst = obj["Successfully Searched"];
    //post_lst.foreach((ele)=>'https://cc-store-photos.s3.amazonaws.com/' + ele)
    console.dir(post_lst);
    //let iterator = post_lst.values();

    for (let i = 0; i < post_lst.length; ++i)
    {
        
      let new_img = document.createElement("img");
      new_img.src = `https://cc-store-photos.s3.amazonaws.com/${post_lst[i]}`;
      new_img.style.float = "left";
      new_img.style.padding="10px";
      new_img.style.width="200px";
      document.getElementById("gallery_out").appendChild(new_img);
    
    }
    document.getElementById('output2').value = paragraph
    
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}


  function post(){
    const post_content = document.getElementById("post").value;
    fetch('https://ciw53fwcnk.execute-api.us-east-1.amazonaws.com/Dev/post', {
      method: 'POST', // or 'PUT'
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      origin: '*',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"content": post_content}),
    }).then((response) => response.json())
    //Then with the data from the response in JSON...
    .then((data) => {
      document.getElementById('output1').innerHTML = JSON.stringify(data);
    })
    //Then with the error genereted...
    .catch((error) => {
      console.error('Error:', error);
    });

  }