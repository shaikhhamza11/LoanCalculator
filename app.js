document.querySelector("#loan-form").addEventListener('submit',function(e){
    //show loader
    document.getElementById('loading').style.display='block';
    //hide result
    document.querySelector('.results').style.display='none';
    setTimeout(calculateResults,2000)
    e.preventDefault();
});

function calculateResults(){
    //ui variables

    const amount= document.querySelector('#amount');
    const interest= document.querySelector('#interest');
    const years= document.querySelector('#years');
    const monthlyPayment= document.querySelector('#monthly-payment');
    const totalPayment= document.querySelector('#total-payment');
    const totalInterest= document.querySelector('#total-interest');

    //calculation
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments =  parseFloat(years.value) * 12;
    const x=Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);


    if(isFinite(monthly)){
        monthlyPayment.value=monthly.toFixed(2);
        totalPayment.value=(monthly*calculatedPayments).toFixed(2);
        totalInterest.value=((monthly*calculatedPayments)-principal).toFixed(2);

        //showresult
        document.querySelector('.results').style.display='block';
        //hhide result
        document.getElementById('loading').style.display='none';
    }
    // else if (monthly===undefined){
    //     showError('Please Enter Numbers To Be Calculated');
    // }
    else{
        showError('Please Check Your Number');
    }
    // e.preventDefault();
    
}
//show Error
function showError(error){
    //hideresult
    document.querySelector('.results').style.display='none';
    //hhide result
    document.getElementById('loading').style.display='none';
    const errorDiv=document.createElement('div');
    errorDiv.className="alert alert-danger";
    errorDiv.appendChild(document.createTextNode(error));
    
    const heading=document.querySelector('.heading');
    const card=document.querySelector('.card');

    card.insertBefore(errorDiv,heading);

    setTimeout(clearError,3000);
}
function clearError(){
    document.querySelector('.alert').remove();
}
