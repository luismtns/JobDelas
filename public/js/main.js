// toggle dropdown profile

$(".profile-tab").on("mouseenter mouseleave", function(){
	$(".profile-tab ul").toggle();
})
 

// modal abrir e fechar

$(".open-modal").click(function(){
	$("html").addClass("modal-open");
	$(".modal-avaliacao-bg").addClass("active");
})

$(".close-btn").click(function(){
	$("html").removeClass("modal-open");
	$(".modal-avaliacao-bg").removeClass("active");
})

// smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});