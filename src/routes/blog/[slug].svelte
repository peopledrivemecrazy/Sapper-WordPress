<script context="module">
	export async function preload({
		params,
		query
	}) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte

		const res = await this.fetch(`${process.env.SAPPER_APP_API_URL}/posts?_embed&slug=${params.slug}`);
		const data = await res.json();
		if (res.status === 200) {
			return {
				post: data[0]
			};
		} else {
			this.error(res.status, data.message);
		}
	}

</script>

<script>
	export let post;

	let name, email, url, comment = ''

	let formerrors;
	let commentSuccess = false;
	async function handleSubmit(e) {


		let formdata = new FormData();
		formdata.append("author_name", name);
		formdata.append("author_email", email);
		formdata.append("author_url", url ? url : '');
		formdata.append("content", comment);
		formdata.append("post", post.id);

		let requestOptions = {
			method: 'POST',
			body: formdata,
		};

		fetch(`${process.env.SAPPER_APP_API_URL}/comments`, requestOptions)
			.then(response => response.json())
			.then(result => {
				console.log(result)
				if (result.code == "rest_comment_content_invalid") {
					formerrors = result.message;

				}
				if (result.code == "rest_invalid_param") {
					formerrors = result.data.params.author_email;
				} else {
					commentSuccess = true;
					name, email, url, comment = ''
				}
				return result;
			})
			.catch(error => console.log('error', error));
	}
</script>

<style>
	:global(img) {
		max-width: 100%;
	}

	.bread-crumb {
		padding: 1em;
		background-color: #eee;
		border-radius: 4px;
	}

	.blog {
		padding-top: 1em;
	}

	.comments {
		border: 1px solid #eee;
		padding: 2em;
	}

	.comments h2 {
		padding: 1em 0;
	}

	.comment-item {
		padding-top: 1em;
	}

	.author-meta {
		display: flex;
		align-items: center;
	}

	.author-meta img {
		border-radius: 100%;
		background-color: #eee;
	}

	.author-meta span {
		padding-left: 1em;
	}

	textarea {
		width: 100%;
		margin: 1em 0;
	}

	.form-input {
		padding: 1em 0;
	}

	.errors {
		color: red;
	}
</style>

<svelte:head>
	<title>{post.title.rendered}</title>
	<meta name="Description" content="{post.excerpt.rendered.replace(/(<p>|<\/p>|\n)/g, "")}">
		
	{#if post._embedded["wp:term"][1].length != 0}
	<meta name="Keywords" content="{post._embedded["wp:term"][1].map(e=>e.slug)}">
	{:else}
	<meta name="Keywords" content="tech,blog">

	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@shriji" />
	<meta name="twitter:url" content="{process.env.SAPPER_APP_SITE}/{post.slug}">
	<meta name="twitter:title" content="{post.title.rendered}">
	<meta name="twitter:description" content="{post.excerpt.rendered.replace(/(<p>|<\/p>|\n)/g, "")}">
	{#if post._embedded["wp:featuredmedia"]}
	<meta name="twitter:image" content="{post._embedded["wp:featuredmedia"][0].source_url}">
	{/if}

	<meta property="og:url" content="{process.env.SAPPER_APP_SITE}/{post.slug}" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{post.title.rendered}" />
	<meta property="og:description" content="{post.excerpt.rendered.replace(/(<p>|<\/p>|\n)/g, "")}" />
	{#if post._embedded["wp:featuredmedia"]}
	<meta property="og:image" content="{post._embedded["wp:featuredmedia"][0].source_url}" />
	{/if}




</svelte:head>


<div class="bread-crumb"><a href="./blog">blog</a> / {post.title.rendered}</div>

<div class="blog">
	<h1>{post.title.rendered}</h1>
	{#if post._embedded["wp:featuredmedia"] }
	<img src={post._embedded["wp:featuredmedia"][0].source_url} alt={post.title.rendered}>
	{/if}

	<div class='content'>
		{@html post.content.rendered}
	</div>

	<div class="comments">
	<h2>Post discussions</h2>

	<form on:submit|preventDefault={handleSubmit}>
		<input class="form-input" type="text" name="name" placeholder="Name" required bind:value={name}> 
		<input class="form-input" type="email" name="email" placeholder="Email" required bind:value={email}>
		<input class="form-input" type="text" name="url" placeholder="Website" bind:value={url}>

		<textarea name="comment" cols="30" rows="10" bind:value={comment}></textarea>
		<button type="submit">Submit</button>
		{#if formerrors}
		<p class="errors">{formerrors}</p>
		{:else if commentSuccess} 
		<p class="success">Comment has been submitted and held for approval</p>
		{/if}
	</form>
	{#if post._embedded.replies}
	
		{#each post._embedded.replies[0] as comment}
		<div class="comment-item">
			<div class="author-meta">
			<img src={comment.author_avatar_urls["96"]} alt={comment.author_name}>
			<span>{comment.author_name} <a href={comment.author_url}>{comment.author_url}</a></span>
			</div>
			{@html comment.content.rendered}
		</div>
		{/each}
		{:else}
		<p>No commets yet :D but you could write one</p>
		{/if}

	</div>
</div>