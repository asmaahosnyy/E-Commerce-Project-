const teamMembers = [
    { name: 'Jane Doe', email: 'jane@example.com' },
    { name: 'Mike Ross', email: 'mike@example.com' },
    { name: 'John Doe', email: 'john@example.com' }
];

function contcat(email) {
    window.open('mailto:' + email);
}
const contactButtons = document.querySelectorAll('#cntbtn');
contactButtons.forEach(function(button, index) {
    button.addEventListener('click', function() {
        contcat(teamMembers[index].email);
    });
});