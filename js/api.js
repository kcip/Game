async function fetchData(chosenWord) {
  //API KEY
  const apikey = '67e2898b-2883-45c6-b055-3c8ba071f230';
  //API URL
  const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${chosenWord}?key=${apikey}`;
  //fetch API data
  const url = BASE_URL;
  try {
    let response = await axios(url);
    let data = response.data;
    renderList(data);
    console.log('api search word', chosenWord);
  } catch (error) {
    console.log('api error', error);
  }
}

export default fetchData;
// const wordDefinition = `
// <div class="modal_inner">
//         <button class="modal_buttonClose"><span>X</span></button>
//         <div class="modal_content">
//           <h2 class="modal_content-h2">pla*gia*rism</h2>
//           <p class="modal_content-partOfspeech">noun</p>
//           <p class="modal_content-p">ˈplā-jə-ˌri-zəm</p>
//           <p class="modal_content-definition">an act or instance of plagiarizing, something plagiarized</p>
//           <p class="modal_content-apiInfo">definition provided by: <span>merriam-webster</span></p>
//         </div>
//       </div>
