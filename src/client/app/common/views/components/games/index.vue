<template>
<div class="libshizuoka83ohishiizumi55suki82">
	<router-link to="reversi" append tag="figure">
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256"><circle cx="104" cy="104" r="18" fill="var(--bg)"/><defs><circle id="a" cx="104" cy="104" r="15"/></defs><clipPath id="b"><use overflow="visible" xlink:href="#a"/></clipPath><g clip-path="url(#b)"><path fill="none" stroke="var(--primary)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M126.9 78.4l-48 48m50.8-45.2l-48 48M132.5 84l-48 48m33.9-62.1l-48 48m50.8-45.2l-48 48M124 75.5l-48 48m11.3 11.3l48-48m2.9 2.9l-48 48"/></g><circle cx="104" cy="104" r="17" fill="none" stroke="var(--primary)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><circle cx="152" cy="152" r="18" fill="var(--bg)"/><defs><circle id="c" cx="152" cy="152" r="15"/></defs><clipPath id="d"><use overflow="visible" xlink:href="#c"/></clipPath><g clip-path="url(#d)"><path fill="none" stroke="var(--primary)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M174.9 126.4l-48 48m50.8-45.2l-48 48m50.8-45.2l-48 48m33.9-62.1l-48 48m50.8-45.2l-48 48m50.8-45.2l-48 48m11.3 11.3l48-48m2.9 2.9l-48 48"/></g><circle cx="152" cy="152" r="17" fill="none" stroke="var(--primary)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><circle cx="152" cy="104" r="18" fill="var(--bg)"/><circle cx="152" cy="104" r="17" fill="none" stroke="var(--primary)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><circle cx="104" cy="152" r="18" fill="var(--bg)"/><circle cx="104" cy="152" r="17" fill="none" stroke="var(--primary)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><circle cx="56" cy="56" r="17" fill="none" stroke="var(--primary)" stroke-dasharray="0 5.933" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><circle cx="56" cy="104" r="17" fill="none" stroke="var(--primary)" stroke-dasharray="0 5.933" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><g><circle cx="56" cy="152" r="17" fill="none" stroke="var(--primary)" stroke-dasharray="0 5.933" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g><g><circle cx="56" cy="200" r="17" fill="none" stroke="var(--primary)" stroke-dasharray="0 5.933" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g><g><circle cx="104" cy="56" r="17" fill="none" stroke="var(--primary)" stroke-dasharray="0 5.933" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g><g><circle cx="152" cy="56" r="17" fill="none" stroke="var(--primary)" stroke-dasharray="0 5.933" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g><g><circle cx="200" cy="56" r="17" fill="none" stroke="var(--primary)" stroke-dasharray="0 5.933" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g><g><circle cx="200" cy="104" r="17" fill="none" stroke="var(--primary)" stroke-dasharray="0 5.933" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g><g><circle cx="200" cy="152" r="17" fill="none" stroke="var(--primary)" stroke-dasharray="0 5.933" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g><g><circle cx="104" cy="200" r="17" fill="none" stroke="var(--primary)" stroke-dasharray="0 5.933" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g><g><circle cx="152" cy="200" r="17" fill="none" stroke="var(--primary)" stroke-dasharray="0 5.933" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g><g><circle cx="200" cy="200" r="17" fill="none" stroke="var(--primary)" stroke-dasharray="0 5.933" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g></svg>
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256"><circle cx="128" cy="128" r="72" fill="var(--bg)"/><defs><circle id="e" cx="128" cy="128" r="60"/></defs><clipPath id="f"><use overflow="visible" xlink:href="#e"/></clipPath><g clip-path="url(#f)"><path fill="none" stroke="var(--primary)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="8" d="M219.4 25.4l-192 192M230.7 36.8l-192 192M242 48.1l-192 192M185.5-8.5l-192 192M196.8 2.8l-192 192M208.1 14.1l-192 192m45.3 45.3l192-192m11.3 11.3l-192 192"/></g><circle cx="128" cy="128" r="68" fill="none" stroke="var(--primary)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="8"/></svg>
		</div>
		<figcaption>{{ $t('@.games.reversi') }}</figcaption>
	</router-link>
</div>
</template>

<style lang="stylus" scoped>
.libshizuoka83ohishiizumi55suki82
	align-items center
	background var(--secondary)
	bottom 0
	display flex
	justify-content center
	left 0
	position fixed
	right 0
	top 0

	figure
		flex 0 1 256px
		transform translateY(0)
		transition transform .1s ease

		div
			background var(--bg)
			border-radius 25%
			box-shadow 0 4px 8px rgba(#000, .2)
			height 256px
			transition box-shadow .1s ease

			svg
				opacity 1
				transition opacity .1s ease

				&:last-child
					height 100%
					left 0
					opacity 0
					position absolute
					transform rotateX(45deg) rotateY(-15deg) rotateZ(30deg) translateZ(-24px)
					transition opacity .1s ease, transform .1s ease
					width 100%

		figcaption
			color var(--primary)
			font-size 24pt
			margin 16px 0 0
			text-align center
			text-shadow 0 4px 8px rgba(#000, .2)
			transition text-shadow .1s ease

		&:hover
			transform translateY(-4px)

			div
				box-shadow 0 8px 8px rgba(#000, .2)

				svg
					opacity 0

					&:last-child
						opacity 1
						transform rotateX(45deg) rotateY(-15deg) rotateZ(30deg)

			figcaption
				text-shadow 0 8px 8px rgba(#000, .2)
</style>

