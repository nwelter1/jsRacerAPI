var table = document.getElementsByTagName('table')[0];

//grab the data

let getJson = async () =>{
    let season = document.querySelector('#season').value;
    let round =  document.querySelector('#round').value;
    // go fetch
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    console.log(response.data)
    return response.data
}


let displayData = async () =>{
    let data = await getJson();
    console.log(data)

    //making table visible
    table.setAttribute('style','')

    // Get data from API call and display
    for(let i = 0; i<7; i++){
        //get position
        let position = document.createElement('th')
        position.innerHTML = `${i+1}`
        position.scope = "row"
        document.querySelector(`#table-row-${i}`).append(position)
        //Get drivername info
        let first = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName
        let last = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName
        let full = first + ' ' + last
        //making variable <td></td>
        let name_display = document.createElement('td')
        name_display.innerHTML = full
        document.querySelector(`#table-row-${i}`).append(name_display)

        // Nationality
        let nationality = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.nationality
        let nation_display = document.createElement('td')
        nation_display.innerHTML = nationality
        document.querySelector(`#table-row-${i}`).append(nation_display)

        //Sponsor
        let sponsor = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].constructorId
        let spons_display = document.createElement('td')
        spons_display.innerHTML = sponsor
        document.querySelector(`#table-row-${i}`).append(spons_display)

        // Points!
        let points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points
        let point_disp = document.createElement('td')
        point_disp.innerHTML = points
        document.querySelector(`#table-row-${i}`).append(point_disp)
    }
    
}

let hideData = () => {
    for(let i = 0; i<7; i++){
        let row = document.querySelector(`#table-row-${i}`);
        row.innerHTML = ''
    }
}