import * as $ from 'jquery'

const TextPattern = () => {
    $('#nome').keypress(function() {
        var nomePattrn = $(this).val().replace(/(^|\s|$)(?!de|do|d$)(.)/g, (geral, match1, match2) => match1 + match2.toUpperCase());
        $(this).val(nomePattrn)

    })

    $('#sobrenome').keypress(function() {
        var sobrenomePattrn = $(this).val().replace(/(^|\s|$)(?!de|do|d$)(.)/g, (geral, match1, match2) => match1 + match2.toUpperCase());
        $(this).val(sobrenomePattrn)
    })
}

const PatternEmail = (email) => {
    var patt = /[!]/
    console.log(patt.test(email))
    return patt.test(email);
}

export { TextPattern, PatternEmail }