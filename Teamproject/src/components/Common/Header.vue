<template>
	<header class="header">
		<h1><router-link to="/" class="logo"><img alt="Vue logo" src="../../assets/images/logo.png"></router-link></h1>
		<div class="menuWrap">
			<ul class="nav">
                <li><router-link to="/HaeNa">HaeNa</router-link></li>
				<li><router-link to="/Mingue">Mingue</router-link></li>
				<li><router-link to="/Boa">Boa</router-link></li>
			</ul>
		</div>
	</header>
</template>

<script>
export default {
	
}
</script>

<style lagn="scss" scoped>
@import '/src/assets/scss/common.scss';
@import '/src/assets/scss/layouts/header.scss';

</style>