fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india", {
  method: "GET",
  headers: {
    "x-rapidapi-key": "af93dfbf1fmsh11afdd00a127d49p1fee0fjsneaa96fe41718",
    "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
  },
})
  .then((response) => response.json())
  .then((data) => {
    ind = document.getElementsByClassName("primary")[0];
    st = document.getElementsByClassName("secondary")[0];
    st.firstElementChild.innerHTML =`<tr>
                                      <th class="col-4" scope="col"><p class="fs-5">States</p></th>
                                      <th class="col-2" scope="col"><p class="fs-5 text-end">Active</p></th>
                                      <th class="col-2" scope="col"><p class="fs-5 text-end">Confirmed</p></th>
                                      <th class="col-2" scope="col"><p class="fs-5 text-end">Recovered</p></th>
                                      <th class="col-2" scope="col"><p class="fs-5 text-end">Deaths</p></th>
                                    </tr>`;
    total = data.total_values;
    console.log(data.state_wise);

    states = [];

    for (state in data.state_wise) {
      states.push([state, data.state_wise[state].active]);
    }

    states.sort((a, b) => b[1] - a[1]);

    ind.innerHTML = `
                      <div class="row w-100">
                        <div class="p-3 text-center text-primary col-6 col-sm-3">
                            <p class="fs-3 fw-bold">Active</p>
                            <h5>${total.active} <span class="fs-6"> ( <i class="fas fa-plus"></i> ${total.deltaconfirmed})</span></h5>
                        </div>
                        <div class="p-3 text-center text-orange col-6 col-sm-3">
                            <p class="fs-3 fw-bold">Confirmed</p>
                            <h5>${total.confirmed} <span class="fs-6"> ( <i class="fas fa-plus"></i> ${total.deltaconfirmed})</span></h5>
                        </div>
                        <div class="w-100 d-block d-sm-none"></div>
                        <div class="p-3 text-center text-success col-6 col-sm-3">
                            <p class="fs-3 fw-bold">Recovered</p>
                            <h5>${total.recovered} <span class="fs-6"> ( <i class="fas fa-plus"></i> ${total.deltarecovered})</span></h5>
                        </div>
                        <div class="p-3 text-center text-danger col-6 col-sm-3">
                            <p class="fs-3 fw-bold">Deaths</p>
                            <h5>${total.deaths} <span class="fs-6"> ( <i class="fas fa-plus"></i> ${total.deltadeaths})</span></h5>
                        </div>
                      </div>
                    `;

    states.forEach((state) => {
      st.children[1].innerHTML += `<tr class="state" data-state="${state[0]}">
                                          <th class="align-middle fs-5" scope="row">${state[0]}</th>
                                          <th class="text-end" scope="row">
                                            <div>
                                              <h6 class="text-primary"> <i class="fas fa-long-arrow-alt-up"></i> ${data.state_wise[state[0]].deltaconfirmed}</h6>
                                              <h5 class="fw-bold">${data.state_wise[state[0]].active}</h5>
                                            </div>
                                          </th>
                                          <th class="text-end" scope="row">
                                            <div>
                                              <h6 class="text-orange"> <i class="fas fa-long-arrow-alt-up"></i> ${data.state_wise[state[0]].deltaconfirmed}</h6>
                                              <h5 class="fw-bold">${data.state_wise[state[0]].confirmed}</h5>
                                            </div>
                                          </th>
                                          <th class="text-end" scope="row">
                                            <div>
                                              <h6 class="text-success"> <i class="fas fa-long-arrow-alt-up"></i> ${data.state_wise[state[0]].deltarecovered}</h6>
                                              <h5 class="fw-bold">${data.state_wise[state[0]].recovered}</h5>
                                            </div>
                                          </th>
                                          <th class="text-end" scope="row">
                                            <div>
                                              <h6 class="text-danger"> <i class="fas fa-long-arrow-alt-up"></i> ${data.state_wise[state[0]].deltadeaths}</h6>
                                              <h5 class="fw-bold">${data.state_wise[state[0]].deaths}</h5>
                                            </div>
                                          </th>
                                        </tr>`;
    });
  })
  .catch((err) => {
    console.error(err);
  });

input = document.getElementById("input");

input.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase();
  st_elements = document.querySelectorAll(".state");

  if (val == "") {
    st_elements.forEach((element) => {
      element.className = "state";
    });
  } else {
    st_elements.forEach((element) => {
      if (element.getAttribute("data-state").toLowerCase().indexOf(val) != -1) {
        element.className = "state";
      } else {
        element.className = "state Inactive";
      }
    });
  }
});
