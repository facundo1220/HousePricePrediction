const bedrooms = document.getElementById('i1')
const bathrooms = document.getElementById('i2')
const sqft_living = document.getElementById('i3')
const sqft_lot = document.getElementById('i4')
const floors = document.getElementById('i5')
const waterfront = document.getElementById('i6')
const view = document.getElementById('i7')
const condition = document.getElementById('i8')
const sqft_above = document.getElementById('i9')
const sqft_basement = document.getElementById('i10')
const yr_built = document.getElementById('i11')
const yr_renovated = document.getElementById('i12')
const city = document.getElementById('i13')

const resultBody = document.getElementById('pred')

const getPrediction = document.getElementById('submit_button');

getPrediction.addEventListener('click', getPricePrediction);

async function getPricePrediction() {


    if (!Number.isInteger(Number(bedrooms.value))) {
        alert('Bedrooms needs to be a whole number')
        return
    }

    if (!Number.isInteger(Number(floors.value))) {
        alert('Floors needs to be a whole number')
        return
    }

    if (!Number.isInteger(Number(waterfront.value))) {
        alert('Waterfront needs to be a whole number')
        return
    }

    if (!Number.isInteger(Number(view.value))) {
        alert('View needs to be a whole number')
        return
    }

    if (!Number.isInteger(Number(condition.value))) {
        alert('Condition needs to be a whole number')
        return
    }

    if (!Number.isInteger(Number(yr_built.value))) {
        alert('Year Built needs to be a whole number')
        return
    }

    if (!Number.isInteger(Number(yr_renovated.value))) {
        alert('Year Renovated needs to be a whole number')
        return
    }

    const formData = {
        'Inputs': {
            'data': [
                {
                    'bedrooms': Number(bedrooms.value),
                    'bathrooms': Number(bathrooms.value),
                    'sqft_living': Number(sqft_living.value),
                    'sqft_lot': Number(sqft_lot.value),
                    'floors': Number(floors.value),
                    'waterfront': Number(waterfront.value),
                    'view': Number(view.value),
                    'condition': Number(condition.value),
                    'sqft_above': Number(sqft_above.value),
                    'sqft_basement': Number(sqft_basement.value),
                    'yr_built': Number(yr_built.value),
                    'yr_renovated': Number(yr_renovated.value),
                    'city': city.children.item(city.selectedIndex).getAttribute('value').toString()
                }
            ]
        }
    }

    const raw = JSON.stringify(formData);

    console.log(raw)

    const myHeaders = new Headers();

    myHeaders.append('Authorization', 'Bearer UipnM3dldVZ0gu244giXZEmwz2VHBAFf');
    myHeaders.append('azureml-model-deployment', 'simple-house-price-prediction');
    myHeaders.append('Content-Type', 'application/json');


    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    const url = 'https://simple-house-price-prediction.eastasia.inference.ml.azure.com/score'

    await fetch(url, requestOptions)
        .then(response => response.text())
        .then(data => {
            updateResult(data)
        })
        .catch(error => {
            alert('ERROR:' + error)
        });

}

function updateResult(data) {

    const obj = JSON.parse(data);
    document.getElementById("pred").innerHTML = "Price prediction: "+obj.Results
}
