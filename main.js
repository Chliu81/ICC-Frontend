function search() {
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
    .then((data) => {
      const processed_obj = JSON.stringify(data);
      const obj = JSON.parse(processed_obj);
      var post_lst = obj["Successfully Searched"];
      //post_lst.foreach((ele)=>'https://cc-store-photos.s3.amazonaws.com/' + ele)
      console.dir(post_lst);
      //let iterator = post_lst.values();

      for (let i = 0; i < post_lst.length; ++i) {

        let new_img = document.createElement("img");
        new_img.src = `https://cc-store-photos.s3.amazonaws.com/${post_lst[i]}`;
        new_img.style.float = "left";
        new_img.style.padding = "10px";
        new_img.style.width = "200px";
        document.getElementById("gallery_out").appendChild(new_img);

      }
      document.getElementById('output2').value = paragraph


    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

function search_voice() {
  const raw_tag = document.getElementById("transcript").value;
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
    .then((data) => {
      const processed_obj = JSON.stringify(data);
      const obj = JSON.parse(processed_obj);
      var post_lst = obj["Successfully Searched"];
      //post_lst.foreach((ele)=>'https://cc-store-photos.s3.amazonaws.com/' + ele)
      console.dir(post_lst);
      //let iterator = post_lst.values();

      for (let i = 0; i < post_lst.length; ++i) {

        let new_img = document.createElement("img");
        new_img.src = `https://cc-store-photos.s3.amazonaws.com/${post_lst[i]}`;
        new_img.style.float = "left";
        new_img.style.padding = "10px";
        new_img.style.width = "200px";
        document.getElementById("gallery_out").appendChild(new_img);

      }
      document.getElementById('output2').value = paragraph


    })
    .catch((error) => {
      console.error('Error:', error);
    });

}


function upload_photo() {
  const new_photo_file = document.getElementById("new-photo");
  const new_photo = new_photo_file.files[0];
  console.log("logging: ", new_photo);

  let tags = document.getElementById("extra-tags").value;
  document.getElementById('extra-tags').innerHTML = "";
  const tag_array = tags.split(" ");
  console.log(new_photo_file, tag_array);
  var filename_path = new_photo_file.value;
  const key = filename_path.replace("C:\\fakepath\\", "");
  console.log(filename_path, key);

  url = "https://7c5adbk1af.execute-api.us-east-1.amazonaws.com/stage1/upload/cc-store-photos/" + key
  photo_json = {
    "url": filename_path,
    "labels": tag_array
  }
  var apigClient = apigClientFactory.newClient();
  var params = {
    //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
    'bucket': 'cc-store-photos',
    'key': key,
    'x-amz-meta-customLabels': tag_array,
    'body': new_photo
  };
  var body = new_photo;
  var additionalParams = {
    //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
    headers: {
      'Content-Type': new_photo.type,
      'x-amz-meta-customLabels': tag_array,
      // 'Access-Control-Allow-Origin' : '*',
      // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  };
  axios.put(url, new_photo, additionalParams).then(function(result) {
    document.getElementById('confirmation').innerHTML = "Your photo has been uploaded";
    document.getElementById('output2').innerHTML = JSON.stringify(data);
    console.log(JSON.stringify(data))
  }).catch(function(result) {
    console.error('Error:', error);
  });

// apigClient.uploadBucketKeyPut(params, body, additionalParams)
//     .then(function(result){
//         //This is where you would put a success callback
//           document.getElementById('confirmation').innerHTML = "Your photo has been uploaded";
//           document.getElementById('output2').innerHTML = JSON.stringify(data);
//           console.log(JSON.stringify(data))
//     }).catch( function(result){
//         //This is where you would put an error callback
//           console.error('Error:', error);
//     });

// fetch(url, {
//   method: 'PUT', // or 'PUT'
//   mode: 'cors', // no-cors, *cors, same-origin
//   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: 'same-origin', // include, *same-origin, omit
//   origin: '*',
//   headers: {
//     'x-amz-meta-customLabels': tag_array,
//     'Content-Type': new_photo.type,
//   },
//   body: new_photo,
// }).then((response) => response.json())
// //Then with the data from the response in JSON...
// .then((data) => {
//   document.getElementById('confirmation').innerHTML = "Your photo has been uploaded";
//   document.getElementById('output2').innerHTML = JSON.stringify(data);
//   console.log(JSON.stringify(data))
// })
// //Then with the error genereted...
// .catch((error) => {
//   console.error('Error:', error);
// });

}
