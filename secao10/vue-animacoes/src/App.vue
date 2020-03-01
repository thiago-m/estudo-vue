<template>
	<div id="app">
		<div class="jumbotron jumbotron-fluid">
			<div class="container">
				<h1 class="display-4">Animações</h1>
				<div class="lead">Treinando transições/animações de elementos/components no Vue.</div>
			</div>
		</div>
		<div class="container">
			
			<!-- <button class="btn btn-primary mb-3" @click="mostrar=!mostrar">Alterar</button> -->
			
			<!-- <transition name="fade">
				<div class="alert alert-primary" v-if="mostrar">Animações no Vue: Class</div>
			</transition>
			<transition 
				enter-class=""
				enter-active-class="animated bounceInLeft"

				leave-class=""
				leave-active-class="animated bounceOutDown"
			>
				<div class="alert alert-primary" v-if="mostrar">Animações no Vue: Animated</div>
			</transition> -->
			<!-- <transition 

				@before-enter="beforeEnter"
				@enter="enter"
				@after-enter="afterEnter"
				@enter-cancelled="enterCancelled"

				@before-leave="beforeLeave"
				@leave="leave"
				@after-leave="afterLeave"
				@leave-cancelled="leaveCancelled"

				:class="false"
			>
				<div class="alert alert-primary" v-if="mostrar">Animações no Vue</div>
			</transition> -->

			<!-- <transition 
				appear
				appear-class=""
				appear-active-class="animated flipInY"
				appear-to-class=""

				@before-appear="beforeAppear"
				@appear="appear"
				@after-appear="afterAppear"
				@appear-cancelled="appearCancelled"
				
				enter-class=""
				enter-active-class="animated bounceInLeft"
				enter-to-class=""
				
				leave-class=""
				leave-active-class="animated bounceOutDown"
				leave-to-class=""
			>
				<div class="alert alert-primary" v-if="mostrar">Animações no Vue</div>
			</transition> -->

			<!-- <div class="form-group">
				<label for="">Animações</label>
				<select class="form-control" v-model="animacaoSelecionada">
					<option value="fade">Fade</option>
					<option value="zoom">Zoom</option>
					<option value="slide">Slide</option>
				</select>
			</div> -->
<!-- 			
			<div class="form-group">
				<label for="">Mensagem</label>
				<select class="form-control" v-model="alertaAtual">
					<option value="info">Informação</option>
					<option value="warning">Alerta</option>
					<option value="success">Sucesso</option>
				</select>
			</div>

			<transition :name="animacaoSelecionada" mode="out-in">
				<div :class="classesDeAlerta" :key="alertaAtual">Animações no Vue ({{alertaAtual}})</div>
			</transition> -->

			
			<!-- <div class="form-group">
				<label for="">Component:</label>
				<select class="form-control" v-model="componentSelecionado">
					<option value="AppHome">Home</option>
					<option value="AppSobre">Sobre</option>
				</select>
			</div>

			<transition :name="animacaoSelecionada" mode="out-in">
				<component :is="componentSelecionado" />
			</transition> -->

			<h3 class="font-weigth-light">Tecnologias</h3>

			<div class="row">
				<div class="col-sm-2">
					<button class="btn btn-info" @click="embaralhar">Embaralhar</button>
				</div>
				<div class="col-sm-10">
					<div class="form-group">
						<input 
							type="text" 
							class="form-control"
							placeholder="Insira um novo item e aperte Enter"
							@keyup.enter="adicionar"
							ref="input"
						>
					</div>
				</div>
			</div>


			<transition-group class="list-group" tag="ul" name="list"> 
				<li 
					class="list-group-item"
					v-for="(tecnologia, indice) in tecnologias"
					:key="tecnologia"
				>
					<span> {{ tecnologia }} </span>
					<button 
						class="btn btn-danger btn-sm float-right"
						@click="remover(indice)"
					>
						x
					</button>
				</li>
			</transition-group>

		</div>
  	</div>
</template>

<script>
import {shuffle} from 'lodash'
export default {
	components: {
		AppHome: () => import('./components/Home.vue'),
		AppSobre: () => import('./components/Sobre.vue')
	},
	data() {
		return {
			mostrar: true,
			animacaoSelecionada: 'fade',
			alertaAtual: 'info',
			componentSelecionado: 'AppHome',
			tecnologias: [
				'javascript',
				'Vue JS',
				'Vuex',
				'Vue Router'
			]
		}
	},
	computed: {
		classesDeAlerta() {
			return {
				alert: true,
				[`alert-${this.alertaAtual}`]: true
			}
		}
	},
	methods: {
		embaralhar() {
			this.tecnologias = shuffle(this.tecnologias)
		},
		adicionar(event) {
			const novoIten = event.target.value
			if(novoIten) {
				const indice = Math.floor(Math.random() * this.tecnologias.length)
				this.tecnologias.splice(indice, 0, novoIten);
				this.$refs.input.value = ''
			}
		},
		remover(indice) {
			this.tecnologias.splice(indice, 1)
		},

		beforeAppear(el){
			console.log('beforeAppear')
		},
		appear(el, done){
			console.log('appear')
			setTimeout(done, 2000)
		},
		afterAppear(el){
			console.log('afterAppear')
		},
		appearCancelled(el){
			console.log('appearCancelled')
		},


		beforeEnter(el) {
			console.log('beforeEnter')
			el.style.opacity = 0;
		},
		enter(el, done) {
			console.log('enter')
			var contagem = 0;
			const intervalo = setInterval(() => {
				el.style.opacity = +el.style.opacity + 0.1
				contagem++
				if(contagem == 10) {
					clearInterval(intervalo)
					done()
				}
			}, 150)
		},
		afterEnter(el){
			console.log('afterEnter')
		},
		enterCancelled(el){
			console.log('enterCancelled')
		},

		beforeLeave(el) {
			console.log('beforeLeave')
			el.style.transition = '0.5s'
			el.style.overflow = 'hidden'
			el.style.whiteSpace = 'nowrap'
		},
		leave(el, done) {
			console.log('leave')
			var contagem = 0
			const tamanho = el.offsetWidth

			const intervalo = setInterval(() => {
				el.style.width = (tamanho * (1 - (contagem / 10))) + 'px'
				contagem++
				if(contagem > 10){
					clearInterval(intervalo)
					done()
				}
			}, 150)

		},
		afterLeave(el) {
			console.log('afterLeave')
		},
		leaveCancelled(el) {
			console.log('leaveCancelled')
		}
	}
}
</script>

<style>
	/* body{
		overflow: hidden;
	} */
</style>

<style scoped>
	/* Animação List transition-group */
	.list-enter,
	.list-leave-to{
		opacity: 0;
		transform: translateX(-70px)
	}
	.list-enter-active,
	.list-leave-active,
	.list-move{
		transition: 1s
	}
	.list-group{
		position: relative;
	}
	.list-leave-active{
		width: 100%;
		position: absolute;
	}

	/* Animação Slide */
	.slide-enter,
	.slide-leave-to{
		opacity: 0;
	}
	.slide-enter-active{
		transition: 0.7s;
		animation: slide 0.7s;
	}
	.slide-leave-active{
		transition: 0.7s;
		animation: slide 0.7s reverse;
	}
	@keyframes slide {
		0% {
			transform: translateX(-100px);
		}
		100% {
			transform: translateX(0px);
		}
	}

	/* Animação Zoom */
	.zoom-enter,
	.zoom-leave-to{
		transform: scale(0);
	}
	.zoom-enter-active,
	.zoom-leave-active{
		transition: 0.5s;
	}

	/* Animação Fade */
	.fade-enter,
	.fade-leave-to{
		opacity: 0;
	}
	.fade-enter-active,
	.fade-leave-active{
		transition: 1s;
	}
</style>