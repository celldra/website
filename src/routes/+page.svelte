<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Copy from '$lib/components/ui/copy/copy.svelte';
	import {
		SiBitcoin,
		SiBootstrap,
		SiCashapp,
		SiCloudflare,
		SiDiscord,
		SiDocker,
		SiDotnet,
		SiGithub,
		SiGo,
		SiJavascript,
		SiLinux,
		SiMysql,
		SiOpenai,
		SiPaypal,
		SiPhp,
		SiPostgresql,
		SiRedis,
		SiRust,
		SiSignal,
		SiStripe,
		SiSvelte,
		SiTailwindcss
	} from '@icons-pack/svelte-simple-icons';
	import { page } from '$app/state';
	import { ArrowRight, ChevronDown, MessageCircleHeart } from 'lucide-svelte';
</script>

<section id="hero" class="border-border flex items-center justify-center border-b py-8 text-center">
	<div>
		<h1 class="mb-2 text-3xl font-bold">Hey, I'm Harry</h1>
		<p class="text-muted-foreground text-xl">
			I'm a self-taught software engineer from the UK with a passion for building literally
			anything, from simple websites to full-scale production ready systems.
		</p>

		<div class="mt-6 flex items-center justify-center gap-2">
			<Button>
				View my blog
				<ArrowRight />
			</Button>

			<Button href="https://github.com/celldra" target="_blank" variant="secondary"
				>Find me on GitHub
				<SiGithub />
			</Button>
		</div>

		<div class="text-muted-foreground mt-8 flex justify-center">
			<ChevronDown size="16" class="animate-bounce" />
		</div>
	</div>
</section>

<section id="blog" class="border-border border-b py-8">
	<h2 class="mb-8 text-2xl font-bold">Snippets from my blog</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"></div>

	{#each page.data.articles as article}
		<Card.Root>
			<Card.Header>
				<Card.Title>
					{article.title}
				</Card.Title>
				<Card.Description>{article.description}</Card.Description>
			</Card.Header>
			<Card.Content></Card.Content>
		</Card.Root>
	{/each}
</section>

<section id="frameworks" class="border-border border-b py-8">
	<h2 class="mb-8 text-2xl font-bold">Frameworks I've worked with</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiSvelte color="#FF3E00" size={32} />
					</div>

					Svelte/SvelteKit
				</Card.Title>
				<Card.Description>Javascript and TypeScript</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					I ❤️ SvelteKit, it is my favourite framework for building frontends, I've been working
					with it for 2+ years now.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiDotnet color="#512BD4" size={32} />
					</div>

					.NET
				</Card.Title>
				<Card.Description>C#, WinForms, WPF, ASP.NET Core and Blazor</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					My all-time favourite language is C#, I've been working with it for 5+ years now. Starting
					off with WinForms progressing to WPF and finally ASP.NET including Blazor and friends.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiGo color="#00ADD8" size={32} />
					</div>

					Go
				</Card.Title>
				<Card.Description>Reverse proxy, DNS server and an (abandoned) virtualizor</Card.Description
				>
			</Card.Header>

			<Card.Content>
				<p>
					I am a great fan of Go, I've been working with it for 2+ years now. I've used it for some
					of my more lower level projects such as my CDN reverse proxy and DNS servers.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiJavascript color="#F7DF1E" size={32} />
					</div>

					Javascript
				</Card.Title>
				<Card.Description>But I mean more in the browser...</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					With my CDN, I had to learn a LOT when it came to Javascript in the browser and how it
					worked, I've learned a lot about how the browser works and how to use it to my advantage.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiPhp color="#777BB4" size={32} />
					</div>

					PHP
				</Card.Title>
				<Card.Description>Nasty, but it's how it all began...</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					Back when I first started programming, this was my first language I learned that I used in
					the backend of a web application, I'm a bit rusty.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiRust size={32} />
					</div>

					Rust
				</Card.Title>
				<Card.Description>I tried, thought it sucked and stopped</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					I have dabbled in Rust, but never got very far with it or really bothered, for me it never
					had much of a use-case.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiPostgresql color="#4169E1" size={32} />
					</div>

					PostgreSQL
				</Card.Title>
				<Card.Description>The ultimate relational database</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					All of my modern projects have been built using PostgreSQL, I've used it for both my
					personal projects and for work. It's just a reliable, modern and secure option to use.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiMysql color="#4479A1" size={32} />
					</div>

					MySQL
				</Card.Title>
				<Card.Description>Back when I used PHP</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					I have used MySQL for a few projects, but I've never used it for anything serious or
					recent as it usually goes hand-in-hand with PHP. Albeit, I have knowledge and experience
					with it.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiRedis color="#FF4438" size={32} />
					</div>

					Redis
				</Card.Title>
				<Card.Description>The most temperamental cache server</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					I love Redis as it is a very fast and <i>somewhat reliable</i> cache server, it is used in
					many of my large-scale projects like the CDN and e-commerce project. And don't forget RedLock.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiTailwindcss color="#06B6D4" size={32} />
					</div>

					Tailwind CSS
				</Card.Title>
				<Card.Description>What a way to style your website</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					I've always used Tailwind CSS for my websites for years now, it is a very powerful tool
					and allows me to style my websites in a very efficient way. I graduated from Bootstrap 3
					to this and I can't say I regret it.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiBootstrap color="#7952B3" size={32} />
					</div>

					Bootstrap
				</Card.Title>
				<Card.Description>But not for a long time...</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					For a while I used Bootstrap 3 for my websites, but I eventually moved to Tailwind CSS and
					haven't looked back. I still use it for some of my personal projects and for some of my
					work, but I'm not a fan of it anymore.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiCloudflare color="#F38020" size={32} />
					</div>

					Cloudflare
				</Card.Title>
				<Card.Description>Not for the faint hearted</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					Cloudflare is a very powerful tool, but since it lacked in its default DDoS protection
					implementation for anyone who isn't a large enterprise with millions I've always had to
					rely on my own rules to protect properties.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiOpenai size={32} />
					</div>

					OpenAI
				</Card.Title>
				<Card.Description>The easy way to implement AI</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					I've leveraged the power of OpenAI's API to build some of my projects, I've used it to
					provide streamlined and cheap automated compliance reviews and verifications for merchant
					accounts as well as site builders.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4 flex items-center gap-4">
						<SiPaypal color="#003087" size={32} />
						<SiStripe color="#635BFF" size={32} />
						<SiBitcoin color="#F7931A" size={32} />
						<SiCashapp color="#00C244" size={32} />
					</div>

					Payments
				</Card.Title>
				<Card.Description>Stripe, PayPal, Cryptocurrency and Cash App</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					With my history of building an e-commerce website, I have deep knowledge and experience in
					implementing various payment solutions and working with REST APIs.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>
					<div class="mb-4">
						<SiDocker color="#2496ED" size={32} />
					</div>

					Docker
				</Card.Title>
				<Card.Description>The most awesome containerization tool ever</Card.Description>
			</Card.Header>

			<Card.Content>
				<p>
					Without Docker, I don't know where I'd be. I've used it for nearly every single project
					I've worked on now to simplify deployment and enhance security. Truly an awesome piece of
					tech.
				</p>
			</Card.Content>
		</Card.Root>
	</div>

	<Card.Root class="mt-4">
		<Card.Header>
			<Card.Title>
				<div class="mb-4">
					<SiLinux color="#FCC624" size={32} />
				</div>

				System administration
			</Card.Title>
			<Card.Description>And to top it all off</Card.Description>
		</Card.Header>

		<Card.Content>
			<p>
				I have a lot of experience with system administration and ensuring secure access and runtime
				of systems, thanks to a lot of my projects being solo work, I could not get someone else to
				deal with this. I've worked with and deployed:
			</p>

			<div class="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<ul class="list-inside list-disc">
					<li>Rocky Linux (the best distro)</li>
					<li>Arch Linux</li>
					<li>Ubuntu</li>
					<li>Debian</li>
					<li>Alpine Linux</li>
					<li>CentOS (RIP)</li>
				</ul>

				<ul class="list-inside list-disc">
					<li>Nginx/Caddy</li>
					<li>SMTP servers (like mailcow)</li>
					<li>BIRD</li>
					<li>SELinux</li>
					<li>Company VPNs (like Tailscale or WireGuard)</li>
					<li>Internal system networks</li>
				</ul>

				<ul class="list-inside list-disc">
					<li>Firewalls (iptables/firewalld)</li>
					<li>Other RHEL-based distros</li>
					<li>SSH keys</li>
					<li>Fail2ban</li>
					<li>Optimised sysctl configurations</li>
					<li>ACME</li>
				</ul>
			</div></Card.Content
		>
	</Card.Root>
</section>

<section id="cta" class="border-b py-8 text-left">
	<h1 class="mb-2 flex items-center gap-3 text-3xl font-bold">
		<MessageCircleHeart class="text-primary" size="32" />
		Want to chat?
	</h1>
	<p class="text-muted-foreground text-xl">
		Feel free to reach out to me, I'm always happy to chat about anything. I have a few
		communication options available, <b>preferably use Signal or GitHub</b>:
	</p>

	<div class="mt-6 flex items-center justify-start gap-2">
		<Card.Root class="flex items-center gap-2 p-3">
			<SiGithub size={16} />
			<p>
				GitHub: <Copy text="celldra" />
			</p>
		</Card.Root>

		<Card.Root class="flex items-center gap-2 p-3">
			<SiSignal size={16} />
			<p>
				Signal: <Copy text="gym.69" />
			</p>
		</Card.Root>

		<Card.Root class="flex items-center gap-2 p-3">
			<SiDiscord size={16} />
			<p>
				Discord: <Copy text="cardjistu_master" />
			</p>
		</Card.Root>
	</div>
</section>
