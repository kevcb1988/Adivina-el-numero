
        // Math.floor(): Redondea un número hacia abajo acercandolo a su entero más cercano
        // Math.random(): Devuelve un número aleatorio entre 0 (inclusive) y 1 (exclusivo):
        let numeroAleatorio = Math.floor(Math.random()*100)+1;
        console.log(numeroAleatorio);
        
        const intentos = document.querySelector("#intentos");
        const ultimo_resultado = document.querySelector("#ultimo-numero-ingresado");
        const cerca_lejos = document.querySelector("#cerca-lejos");

        const numero_agregado = document.querySelector("#numero-agregado");
        const boton_enviar_numero = document.querySelector("#boton-enviar-numero");

        let contador_intentos = 1;
        let boton_reset;

        function validar_numero(){
            let usuarioIntento = Number(numero_agregado.value);    
            
            if(contador_intentos === 1){
                intentos.textContent = 'Intentos anteriores: ';
            }
            intentos.textContent += usuarioIntento + ' ';

            if(usuarioIntento === numeroAleatorio){
                ultimo_resultado.className += ('alert alert-success');
                ultimo_resultado.textContent = '¡Felicidades, lo has adivinado!';
                cerca_lejos = '';
                juegoFinalizado();
            }else if(contador_intentos === 10){
                ultimo_resultado.textContent = '¡Fin del juego. Acabaste el máximo de intentos.!';
                ultimo_resultado.className += ('alert alert-danger');
                juegoFinalizado();
            }else{
                ultimo_resultado.className += ('alert alert-danger');
                ultimo_resultado.textContent = '¡Equivocado!';
                if(usuarioIntento < numeroAleatorio){
                    cerca_lejos.className += ("alert alert-warning");
                    cerca_lejos.textContent = 'Te estas acercando';
                }else if(usuarioIntento > numeroAleatorio){
                    cerca_lejos.className += ("alert alert-warning");
                    cerca_lejos.textContent = 'Te estas alejando';
                }
            }
            contador_intentos++;
            numero_agregado.value = '';
            ultimo_resultado;
            // numero_agregado.focus();
        }

        function juegoFinalizado(){
            numero_agregado.disabled = true;
            boton_enviar_numero.disabled = true;
            boton_reset = document.createElement('button');
            boton_reset.className += 'm-auto col-4 btn btn-primary';
            boton_reset.textContent = 'Iniciar nuevo juego';
            document.body.appendChild(boton_reset);
            boton_reset.addEventListener('click', jugar_nuevamente);
        }

        function jugar_nuevamente(){
            contador_intentos = 1;
            
            const resetParametros = document.querySelectorAll('.alertas div');
            for(let i = 0; i < resetParametros.length; i++){
                resetParametros[i].textContent = '';
            }
            
            boton_reset.parentNode.removeChild(boton_reset);
            
            numero_agregado.disabled = false;
            boton_enviar_numero.disabled = false ;
            numero_agregado.value = '';

            ultimo_resultado.className += 'none';
            numeroAleatorio = Math.floor(Math.random()*100)+1;
            console.log(numeroAleatorio);

        }

        boton_enviar_numero.addEventListener('click', validar_numero);
