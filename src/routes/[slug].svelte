<script context="module">
    export async function preload({
        params,
        query
    }) {

        const res = await this.fetch(`${process.env.SAPPER_APP_API_URL}/pages?slug=${params.slug}`)
        const data = await res.json()
           if(data.length != 0) {
            return {
                page: data[0]
            }
           }
           else{
            this.redirect(301,"error")
           }

    }
</script>

<style>
    :global(blockquote) {
        border-color: #159794;
        border-style: solid;
        border-width: 0 0 0 .2rem;
        color: inherit;
        font-size: 1em;
        margin: 4rem 0;
        padding: .5rem 0 .5rem 2rem;
    }
</style>
<script>
    export let page

</script>

<svelte:head>
	<title>{page.title.rendered}</title>
</svelte:head>

<h1>{page.title.rendered}</h1>

<div class="content">
    {@html page.content.rendered}
</div>