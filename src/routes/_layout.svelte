<script context="module">
	// export async function preload() {
    //     const res = await this.fetch(`${process.env.SAPPER_APP_API_URL}/pages`)
	// 	const data = await res.json()
    //     return {
    //         data
    //     }
	// }
	export async function preload() {
        const res = await this.fetch(`${process.env.SAPPER_APP_API_MENU}/menus/main-menu`)
		const data = await res.json()
        return {
            data
        }
	}

</script>



<script>
	export let data;
	import Nav from '../components/Nav.svelte';
	export let segment;
	export let pageData = [];
	data.items.map(e=>{
		let obj = 
		{
			id:e.ID,
			slug:e.slug
		}
		
		pageData.push(obj)
	})

</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment} {pageData}/>

<main>
	<slot></slot>
</main>
