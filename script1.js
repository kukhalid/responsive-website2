// constants
const body = document.querySelector("body"),
    loader = document.querySelector(".loader-wrap"),
    links = document.querySelectorAll('a[href="#"]'),
    nav = document.querySelector("header nav"),
    navToggle = document.querySelector("header nav .toggle"),
    navSpanMiddle = document.querySelector("header nav .toggle .middle"),
    navNavigationBar = document.querySelector("header nav .navigation-bar"),
    navNavigationBarLi = document.querySelectorAll(
        "header nav .navigation-bar li"
    ),
    headerText = document.querySelector("header .text"),
    headerSection = document.querySelector("header"),
    aboutSection = document.querySelector(".about-us"),
    recipeSection = document.querySelector(".recipes"),
    menuSection = document.querySelector(".menu"),
    fixedImageSection = document.querySelector(".fixed-image"),
    footerSection = document.querySelector("footer"),
    dotOne = document.querySelector(".dots .one"),
    dotTwo = document.querySelector(".dots .two"),
    dotThree = document.querySelector(".dots .three"),
    dots = document.querySelectorAll(".dots > div"),
    logoImage = document.querySelector("header nav .logo img"),
    svgDown = document.querySelector("header .arrow-down"),
    svgUp = document.querySelector(".copyright .arrow-up"),
    menuImgs = document.querySelectorAll(".menu .menu-image-container img"),
    boxModel = document.querySelector(".menu .box-model"),
    menuImageContainer = document.querySelector(".menu-image-container"),
    boxModelArrow = document.querySelector(".menu .box-model .arrow"),
    boxModelImage = document.querySelector(".menu .box-model img"),
    pageTitle = document.querySelector("title");

// remove loader
function fadeOutEffect() {
    const fadeEffect = setInterval(function() {
        if (!loader.style.opacity) {
            loader.style.opacity = 1;
        }
        if (loader.style.opacity > 0) {
            loader.style.opacity -= 0.4;
        } else {
            body.classList.remove('stop-scroll');
            loader.classList.add('remove');
            clearInterval(fadeEffect);
        }
    }, 100);
}
window.addEventListener("load", fadeOutEffect);

// prevent links click hash
links.forEach(link =>
    link.addEventListener("click", function(e) {
        e.preventDefault();
    })
);

// toggle hamburger menu button
navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navSpanMiddle.classList.toggle("hide");
    navNavigationBar.classList.toggle("show");
});

// show active navigationbar li
navNavigationBarLi.forEach(li =>
    li.addEventListener("click", () => {
        const arr = Array.from(li.parentElement.children);
        arr.forEach(li => li.classList.remove("active"));
        li.classList.add("active");
    })
);

// svg-up smooth scroll
svgUp.addEventListener("click", () => {
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
});

window.onscroll = function() {
    // make navbar fixed & change logo color
    if (window.pageYOffset > headerSection.offsetHeight - 75) {
        nav.classList.add("active");
        logoImage.src = "new-logo.png";
    } else {
        nav.classList.remove("active");
        logoImage.src = "new-logo.png";
    }

    // header welcome fade out and in
    if (window.pageYOffset > 0) {
        headerText.style.opacity = -window.pageYOffset / 300 + 1;
    }
    // home page JS
    if (pageTitle.text === "Meal Magic - Restaurant") {
        //change dots background color
        if (window.pageYOffset < headerSection.offsetHeight * 0.5) {
            dots.forEach(dot => dot.classList.remove("black"));
            dotTwo.classList.remove("active");
            dotOne.classList.add("active");
        } else if (
            window.pageYOffset > headerSection.offsetHeight * 0.5 &&
            window.pageYOffset < recipeSection.offsetTop * 0.72
        ) {
            dots.forEach(dot => dot.classList.add("black"));
        } else if (
            window.pageYOffset > recipeSection.offsetTop * 0.75 &&
            window.pageYOffset < menuSection.offsetTop * 0.81
        ) {
            dots.forEach(dot => dot.classList.remove("black"));
            dotOne.classList.remove("active");
            dotThree.classList.remove("active");
            dotTwo.classList.add("active");
        } else if (
            window.pageYOffset > menuSection.offsetTop * 0.81 &&
            window.pageYOffset < fixedImageSection.offsetTop * 0.86
        ) {
            dots.forEach(dot => dot.classList.add("black"));
            dotThree.classList.remove("active");
            dotTwo.classList.add("active");
        } else if (
            window.pageYOffset > fixedImageSection.offsetTop * 0.86 &&
            window.pageYOffset < footerSection.offsetTop * 0.72
        ) {
            dots.forEach(dot => dot.classList.remove("black"));
            dotTwo.classList.remove("active");
            dotThree.classList.add("active");
        } else if (
            window.pageYOffset > footerSection.offsetTop * 0.72 &&
            window.pageYOffset < footerSection.offsetTop * 0.901
        ) {
            dots.forEach(dot => dot.classList.add("black"));
        } else if (window.pageYOffset > footerSection.offsetTop * 0.901) {
            dots.forEach(dot => dot.classList.remove("black"));
        }
    }
};

// home page JS
if (pageTitle.text === "Meal Magic - Restaurant") {
    // svg-down smooth scroll
    svgDown.addEventListener("click", () => {
        window.scroll({
            top: aboutSection.offsetTop - 30,
            behavior: "smooth"
        });
    });

    // dots smooth scroll
    dots.forEach(dot =>
        dot.addEventListener("click", function() {
            window.scrollTo({
                top: document.querySelector(this.dataset.x).offsetTop - 100,
                behavior: "smooth"
            });
        })
    );

    // show box model
    menuImgs.forEach(img =>
        img.addEventListener("click", function() {
            const arr = Array.from(this.parentElement.parentElement.children);

            arr.forEach(div => div.classList.remove("active"));

            this.parentElement.classList.add("active");
            boxModel.classList.add("active");
            boxModelImage.src = this.src;
            boxModelImage.classList.add("active");
            body.classList.add("hide-scroll");
        })
    );

    // box model functions
    function boxModelFun(e) {
        // close box model
        if (
            e.code === "Escape" ||
            (e.target.tagName === "DIV" && !e.target.classList.contains("arrow")) ||
            e.target.classList.contains("close")
        ) {
            boxModel.classList.remove("active");
            body.classList.remove("hide-scroll");
        }

        if (boxModel.classList.contains("active")) {
            if (
                e.code === "ArrowRight" ||
                e.code === "ArrowLeft" ||
                e.target.classList.contains("arrow-right") ||
                e.target.classList.contains("arrow-left")
            ) {
                const arr = Array.from(menuImageContainer.children);
                const active = arr.find(div => div.classList.contains("active"));

                // change box model image
                if (
                    e.target.classList.contains("arrow-right") ||
                    e.code === "ArrowRight"
                ) {
                    if (active.nextElementSibling === null) {
                        active.parentElement.firstElementChild.classList.add("active");
                        boxModelImage.src =
                            active.parentElement.firstElementChild.firstElementChild.src;
                    } else {
                        active.nextElementSibling.classList.add("active");
                        boxModelImage.src = active.nextElementSibling.firstElementChild.src;
                    }
                }

                // change box model image
                else if (
                    e.target.classList.contains("arrow-left") ||
                    e.code === "ArrowLeft"
                ) {
                    if (active.previousElementSibling === null) {
                        active.parentElement.lastElementChild.classList.add("active");
                        boxModelImage.src =
                            active.parentElement.lastElementChild.lastElementChild.src;
                    } else {
                        active.previousElementSibling.classList.add("active");
                        boxModelImage.src =
                            active.previousElementSibling.firstElementChild.src;
                    }
                }
                active.classList.remove("active");
            }
        }
    }

    // Add functionality for Chefs section
    document.querySelectorAll('.Chefs .image').forEach((image) => {
        image.addEventListener('click', () => {
            document.querySelector('.Chefs .box-model').classList.add('active');
        });
    });

    document.querySelector('.Chefs .box-model .close').addEventListener('click', () => {
        document.querySelector('.Chefs .box-model').classList.remove('active');
    });

    // Navigation functionality
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetPage = link.getAttribute('data-page');

            pages.forEach(page => {
                page.classList.add('hidden');
            });

            document.getElementById(targetPage).classList.remove('hidden');
        });
    });

    // Signup Functionality
    document.getElementById('signup-btn').addEventListener('click', () => {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
    
        if (name && email && password) {
            localStorage.setItem('user', JSON.stringify({ name, email, password }));
            alert('Sign Up Successful! Redirecting to Login page...');
    
            document.getElementById('signup').classList.add('hidden');
            document.getElementById('login').classList.remove('hidden');
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Login Functionality
    document.getElementById('login-btn').addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
    
        const user = JSON.parse(localStorage.getItem('user'));
    
        if (user && user.email === email && user.password === password) {
            alert(`Welcome back, ${user.name}!`);
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
    console.log(name, email, password);

    document.addEventListener("DOMContentLoaded", () => {
        // Scroll to SignUp
        document.querySelector('a[data-page="signup"]').addEventListener("click", (event) => {
            event.preventDefault();
    
            // Clear signup form fields
            document.getElementById("signup-name").value = "";
            document.getElementById("signup-email").value = "";
            document.getElementById("signup-password").value = "";
            document.getElementById("signup-error").style.display = "none";
    
            // Scroll to signup section
            document.getElementById("signup").scrollIntoView({ behavior: "smooth" });
        });
    
        // Scroll to Login
        document.querySelector('a[data-page="login"]').addEventListener("click", (event) => {
            event.preventDefault();
    
            // Clear login form fields
            document.getElementById("login-email").value = "";
            document.getElementById("login-password").value = "";
            document.getElementById("login-error").style.display = "none";
    
            // Scroll to login section
            document.getElementById("login").scrollIntoView({ behavior: "smooth" });
        });
    
        // Handle Sign Up
        document.getElementById("signup-btn").addEventListener("click", () => {
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
    
            if (name && email && password) {
                alert("Sign Up Successful!");
    
                // Clear fields after sign-up
                document.getElementById("signup-name").value = "";
                document.getElementById("signup-email").value = "";
                document.getElementById("signup-password").value = "";
            } else {
                document.getElementById("signup-error").style.display = "block";
            }
        });
    
        // Handle Login
        document.getElementById("login-btn").addEventListener("click", () => {
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;
    
            if (email && password) {
                alert("Login Successful!");
    
                // Clear fields after login
                document.getElementById("login-email").value = "";
                document.getElementById("login-password").value = "";
            } else {
                document.getElementById("login-error").style.display = "block";
            }
        });
    });

    // Function to clear input fields
    function clearInputFields() {
        document.getElementById('signup-name').value = '';
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-password').value = '';
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
    }

    // Sign Up button click event
    document.getElementById('signup-btn').addEventListener('click', function() {
        // Perform sign up logic here
        // After successful sign up, clear input fields
        clearInputFields();
        // Optionally, you can switch to the login page or show a success message
    });

    // Login button click event
    document.getElementById('login-btn').addEventListener('click', function() {
        // Perform login logic here
        // After successful login, clear input fields
        clearInputFields();
        // Optionally, you can switch to the signup page or show a success message
    });
    

    

    window.addEventListener("keydown", boxModelFun);
    window.addEventListener("click", boxModelFun);
    boxModelArrow.addEventListener("click", boxModelFun);
}