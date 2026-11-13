// =====================================
// PORTAFOLIO PERSONAL - CARLOS BATISTA
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. MODO OSCURO Y MODO CLARO
    // =====================================

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle
        ? themeToggle.querySelector("i")
        : null;

    // Detectar el tema guardado o el tema del dispositivo
    function getInitialTheme() {
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme) {
            return savedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    // Aplicar tema
    function applyTheme(theme) {

        if (theme === "dark") {
            document.body.classList.add("dark");

            if (themeIcon) {
                themeIcon.className = "fa-solid fa-sun";
            }

            if (themeToggle) {
                themeToggle.setAttribute(
                    "aria-label",
                    "Activar modo claro"
                );
            }

        } else {
            document.body.classList.remove("dark");

            if (themeIcon) {
                themeIcon.className = "fa-solid fa-moon";
            }

            if (themeToggle) {
                themeToggle.setAttribute(
                    "aria-label",
                    "Activar modo oscuro"
                );
            }
        }

    }

    // Cargar tema inicial
    applyTheme(getInitialTheme());

    // Cambiar tema al pulsar el botón
    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const isDark = document.body.classList.contains("dark");

            const newTheme = isDark ? "light" : "dark";

            applyTheme(newTheme);

            // Guardar preferencia
            localStorage.setItem("portfolio-theme", newTheme);

        });

    }


    // =====================================
    // 2. AÑO AUTOMÁTICO DEL FOOTER
    // =====================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================
    // 3. FORMULARIO DE CONTACTO
    // =====================================

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Obtener los datos del formulario
            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();

            // Validar campos
            if (!nombre || !correo || !mensaje) {

                if (formStatus) {
                    formStatus.textContent =
                        "Por favor, completa todos los campos.";
                }

                return;
            }

            // Preparar el contenido del correo
            const asunto = encodeURIComponent(
                "Mensaje desde el portafolio de Carlos Batista"
            );

            const cuerpo = encodeURIComponent(
                "Nombre: " + nombre +
                "\nCorreo: " + correo +
                "\n\nMensaje:\n" + mensaje
            );

            // Dirección de correo del portafolio
            const destinatario = "carlosalbertopimentel525@gmail.com";

            // Crear enlace de correo
            const enlaceCorreo =
                "mailto:" + destinatario +
                "?subject=" + asunto +
                "&body=" + cuerpo;

            if (formStatus) {
                formStatus.textContent =
                    "Abriendo tu aplicación de correo...";
            }

            // Abrir aplicación de correo
            window.location.href = enlaceCorreo;

        });

    }


    // =====================================
    // 4. CERRAR MENÚ MÓVIL AL SELECCIONAR
    // =====================================

    const menuLinks = document.querySelectorAll(
        ".navbar-collapse .nav-link"
    );

    const menuPrincipal = document.getElementById("menuPrincipal");

    if (menuPrincipal && typeof bootstrap !== "undefined") {

        const menuCollapse =
            bootstrap.Collapse.getOrCreateInstance(
                menuPrincipal,
                { toggle: false }
            );

        menuLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                if (window.innerWidth < 992) {
                    menuCollapse.hide();
                }

            });

        });

    }


    // =====================================
    // 5. ANIMACIÓN DE APARICIÓN
    // =====================================

    const revealElements = document.querySelectorAll("[data-reveal]");

    if ("IntersectionObserver" in window && revealElements.length > 0) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });

    }


    // =====================================
    // 6. MENSAJE EN CONSOLA
    // =====================================

    console.log("Portafolio de Carlos Batista cargado correctamente.");

});