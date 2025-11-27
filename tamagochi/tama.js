// Clase Tamagotchi con IA básica
class Tamagotchi {
    constructor() {
        this.hambre = 50;
        this.energia = 100;
        this.felicidad = 80;
        this.vivo = true;
        this.nombre = "Taco";
        
        // Inicializar el display
        this.actualizarDisplay();
        
        // El gato "piensa" cada 3 segundos
        this.intervaloPensamiento = setInterval(() => this.pensar(), 3000);
        
        // El tiempo afecta los estados cada 2 segundos
        this.intervaloTiempo = setInterval(() => this.pasarTiempo(), 2000);
    }

    // ============= IA BÁSICA: TACO "PIENSA" =============
    pensar() {
        if (!this.vivo) return;

        let pensamiento = "";
        let cara = "😊";

        // Lógica de decisión según estados
        if (this.hambre > 70) {
            pensamiento = "¡Tengo mucha hambre! 😋 Necesito comida";
            cara = "😭";
        } else if (this.energia < 30) {
            pensamiento = "Estoy muy cansado 😴 Necesito dormir";
            cara = "😴";
        } else if (this.felicidad < 40) {
            pensamiento = "Estoy triste 😞 ¿Quieres jugar conmigo?";
            cara = "😢";
        } else if (this.felicidad > 80 && this.hambre < 40 && this.energia > 60) {
            pensamiento = "¡Estoy muy feliz! 🥳 La vida es hermosa";
            cara = "😄";
        } else if (this.hambre > 50) {
            pensamiento = "Tengo un poco de hambre 🍖";
            cara = "😐";
        } else if (this.energia < 50) {
            pensamiento = "Estoy un poco cansado 😑";
            cara = "😑";
        } else {
            // Estados neutrales
            const pensamientos = [
                "¡Hola! ¿Cómo estás? 😺",
                "Estoy bien, gracias por cuidarme 😻",
                "¿Quieres jugar? 🎮",
                "Estoy disfrutando el día 😸",
                "¡Miau! 🐱"
            ];
            pensamiento = pensamientos[Math.floor(Math.random() * pensamientos.length)];
            cara = "😊";
        }

        // Verificar si está muerto
        if (this.hambre >= 100 || this.energia <= 0 || this.felicidad <= 0) {
            pensamiento = "💀 ¡Oh no! Taco ha fallecido...";
            cara = "💀";
            this.vivo = false;
        }

        // Actualizar la cara y pensamiento en la pantalla
        document.getElementById("cara").textContent = cara;
        document.getElementById("pensamiento").textContent = pensamiento;
    }

    // ============= ACCIONES DEL JUGADOR =============
    comer() {
        if (!this.vivo) return;
        
        this.hambre = Math.max(0, this.hambre - 40);
        this.energia = Math.max(0, this.energia - 10); // Comer consume algo de energía
        this.felicidad = Math.min(100, this.felicidad + 10); // Comer da algo de felicidad
        
        this.mostrarMensaje("¡Ñam ñam! 😋 Taco está comiendo");
        this.animarComer();
        this.actualizarDisplay();
    }

    dormir() {
        if (!this.vivo) return;
        
        this.energia = Math.min(100, this.energia + 50);
        this.hambre = Math.min(100, this.hambre + 20); // Dormir aumenta hambre después
        this.felicidad = Math.min(100, this.felicidad + 5);
        
        this.mostrarMensaje("Zzz... 😴 Taco está durmiendo");
        this.animarDormir();
        this.actualizarDisplay();
    }

    jugar() {
        if (!this.vivo) return;
        
        // Jugar requiere energía
        if (this.energia < 20) {
            this.mostrarMensaje("Taco está muy cansado para jugar 😴");
            return;
        }
        
        this.felicidad = Math.min(100, this.felicidad + 40);
        this.energia = Math.max(0, this.energia - 30);
        this.hambre = Math.min(100, this.hambre + 15);
        
        this.mostrarMensaje("¡Woohoo! 🎮 ¡Taco está jugando!");
        this.animarJuego();
        this.actualizarDisplay();
    }

    // ============= ANIMACIONES PARA JUGAR =============
    animarJuego() {
        const cara = document.getElementById("cara");
        const animaciones = ["saltar", "girar", "bailar", "rebotar"];
        
        // Seleccionar animación aleatoria
        const animacion = animaciones[Math.floor(Math.random() * animaciones.length)];
        
        // Limpiar animaciones previas
        cara.classList.remove("animacion-saltar", "animacion-girar", "animacion-bailar", "animacion-rebotar", "animacion-pulso");
        
        // Aplicar nueva animación
        cara.classList.add(`animacion-${animacion}`);
        
        // Crear confeti y partículas
        this.crearConfeti();
        this.crearParticulas();
        
        // Remover la clase de animación después de que termine
        setTimeout(() => {
            cara.classList.remove(`animacion-${animacion}`);
        }, 1500);
    }

    // ============= CREAR CONFETI =============
    crearConfeti() {
        const colores = ["#ff6b6b", "#4ecdc4", "#ffd93d", "#a78bfa", "#ff8c42"];
        
        for (let i = 0; i < 20; i++) {
            const confeti = document.createElement("div");
            confeti.className = "confeti";
            confeti.style.left = Math.random() * window.innerWidth + "px";
            confeti.style.top = "50%";
            confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
            confeti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
            
            document.body.appendChild(confeti);
            
            // Remover después de la animación
            setTimeout(() => confeti.remove(), 3000);
        }
    }

    // ============= CREAR PARTÍCULAS FLOTANTES =============
    crearParticulas() {
        const particulas = ["🎮", "⭐", "🎉", "✨", "💫", "🎊"];
        
        for (let i = 0; i < 15; i++) {
            const particula = document.createElement("div");
            particula.className = "particula";
            particula.textContent = particulas[Math.floor(Math.random() * particulas.length)];
            
            const cara = document.getElementById("cara");
            const rect = cara.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            
            particula.style.left = startX + "px";
            particula.style.top = startY + "px";
            
            // Dirección aleatoria
            const angle = (Math.PI * 2 * i) / 15;
            const velocidad = 100 + Math.random() * 100;
            const tx = Math.cos(angle) * velocidad;
            const ty = Math.sin(angle) * velocidad;
            
            particula.style.setProperty("--tx", tx + "px");
            particula.style.setProperty("--ty", ty + "px");
            
            document.body.appendChild(particula);
            
            // Remover después de la animación
            setTimeout(() => particula.remove(), 1000);
        }
    }

    // ============= ANIMACIÓN AL COMER =============
    animarComer() {
        const cara = document.getElementById("cara");
        cara.classList.add("animacion-pulso");
        
        // Crear burbujas de comida
        this.crearBubujas("🍖");
        
        setTimeout(() => {
            cara.classList.remove("animacion-pulso");
        }, 400);
    }

    // ============= ANIMACIÓN AL DORMIR =============
    animarDormir() {
        const cara = document.getElementById("cara");
        cara.classList.add("animacion-brillar");
        
        // Crear efectos de sueño (Z)
        this.crearBubujas("💤");
        
        setTimeout(() => {
            cara.classList.remove("animacion-brillar");
        }, 500);
    }

    // ============= CREAR BURBUJAS =============
    crearBubujas(emoji) {
        for (let i = 0; i < 8; i++) {
            const burbuja = document.createElement("div");
            burbuja.className = "particula";
            burbuja.textContent = emoji;
            
            const cara = document.getElementById("cara");
            const rect = cara.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            
            burbuja.style.left = startX + "px";
            burbuja.style.top = startY + "px";
            
            // Subir hacia arriba
            const tx = (Math.random() - 0.5) * 80;
            const ty = -150 - Math.random() * 100;
            
            burbuja.style.setProperty("--tx", tx + "px");
            burbuja.style.setProperty("--ty", ty + "px");
            
            document.body.appendChild(burbuja);
            
            setTimeout(() => burbuja.remove(), 1000);
        }
    }

    // ============= TIEMPO PASA =============
    pasarTiempo() {
        if (!this.vivo) return;
        
        // El hambre aumenta con el tiempo
        this.hambre = Math.min(100, this.hambre + 3);
        
        // La energía disminuye lentamente si está despierto
        if (this.energia > 40) {
            this.energia = Math.max(0, this.energia - 1);
        }
        
        // La felicidad disminuye si tiene hambre o cansancio
        if (this.hambre > 60 || this.energia < 30) {
            this.felicidad = Math.max(0, this.felicidad - 2);
        } else {
            this.felicidad = Math.min(100, this.felicidad + 1);
        }
        
        // Verificar si está muerto
        if (this.hambre >= 100 || this.energia <= 0 || this.felicidad <= 0) {
            this.vivo = false;
            this.mostrarMensaje("💀 ¡Taco ha fallecido!");
        }
        
        this.actualizarDisplay();
    }

    // ============= ACTUALIZAR LA PANTALLA =============
    actualizarDisplay() {
        // Actualizar valores numéricos
        document.getElementById("hambre-value").textContent = this.hambre;
        document.getElementById("energia-value").textContent = this.energia;
        document.getElementById("felicidad-value").textContent = this.felicidad;
        
        // Actualizar barras de progreso
        document.getElementById("hambre-bar").style.width = this.hambre + "%";
        document.getElementById("hambre-bar").textContent = this.hambre + "%";
        
        document.getElementById("energia-bar").style.width = this.energia + "%";
        document.getElementById("energia-bar").textContent = this.energia + "%";
        
        document.getElementById("felicidad-bar").style.width = this.felicidad + "%";
        document.getElementById("felicidad-bar").textContent = this.felicidad + "%";
        
        // Cambiar estilo si está muerto
        const display = document.querySelector(".tamagotchi-display");
        if (!this.vivo) {
            display.classList.add("estado-muerto");
            document.querySelectorAll("button:not(.btn-reiniciar)").forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = "0.5";
                btn.style.cursor = "not-allowed";
            });
        }
    }

    mostrarMensaje(mensaje) {
        document.getElementById("pensamiento").textContent = mensaje;
    }

    reiniciar() {
        // Limpiar intervalos
        clearInterval(this.intervaloPensamiento);
        clearInterval(this.intervaloTiempo);
        
        // Crear nueva instancia
        this.hambre = 50;
        this.energia = 100;
        this.felicidad = 80;
        this.vivo = true;
        
        // Limpiar estilos
        const display = document.querySelector(".tamagotchi-display");
        display.classList.remove("estado-muerto");
        document.querySelectorAll("button:not(.btn-reiniciar)").forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
        });
        
        // Reiniciar intervalos
        this.intervaloPensamiento = setInterval(() => this.pensar(), 3000);
        this.intervaloTiempo = setInterval(() => this.pasarTiempo(), 2000);
        
        this.mostrarMensaje("¡Hola! Soy Taco 🐱");
        document.getElementById("cara").textContent = "😊";
        this.actualizarDisplay();
    }
}

// ============= INICIALIZAR CUANDO CARGA LA PÁGINA =============
let tamagotchi;

window.addEventListener("load", () => {
    tamagotchi = new Tamagotchi();
});

// Limpiar intervalos cuando se cierra la página
window.addEventListener("beforeunload", () => {
    if (tamagotchi) {
        clearInterval(tamagotchi.intervaloPensamiento);
        clearInterval(tamagotchi.intervaloTiempo);
    }
});
