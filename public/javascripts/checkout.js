Stripe.setPublishableKey('pk-test_Z8RrHN8qJmYA48M2FGGmpL3N');
let $form = $('#checkout-form');
$form.submit(function(event) {
    console.log($('#name').val())
    $('#charge-error').addClass('hidden');
    $form.find('button').prop('disabled', true);
    Stripe.card.createtoken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-exp-month').val(),
        exp_year: $('#card-exp-year').val(),
        name: $('#card-holder-name').val()
    }, stripeResponsehandler);
    return false
})

function stripeResponsehandler(status, response) {
    if (response.error) { // Problem!

        // Show the error on the form
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false) // Re-enable subbmission
    } else { // Token was created

        // Get the token ID:    
        let token = response.id
            // Insert the token into the form so it gets submitted to the server
        $form.append($('<<input type="hidden" name="strieToken" >').val(token));
        // Submit the form
        $form.get(0).submit()
    }
}