<template>
	<header class="header">
		<h1><router-link to="/" class="logo"><img alt="Vue logo" :src="logo"/></router-link></h1>
		<div class="menuWrap">
			<ul class="nav clearfix">
                <li><router-link to="/Hannah">Hannah</router-link></li>
				<li><router-link to="/Mingyu">Mingyu</router-link></li>
				<li><router-link to="/Boa">Boa</router-link></li>
			</ul>
		</div>
	</header>
</template>

<script>
import logo from '@/assets/images/logo.png'
export default {
	name: 'comp-header',
	data() {
		return {
			logo: logo
		}
	}
}
</script>

<style lang="scss">
@import '/src/assets/scss/common.scss';
@import '/src/assets/scss/layouts/header.scss';

</style>