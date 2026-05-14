import { useEffect, useRef } from 'react'
import type { Material } from 'three'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4'

const navigationItems = [
  'Home',
  'What We Do',
  'Designs',
  'Our Story',
  'Collaborations',
  'Get in Touch',
]

const metrics = [
  ['2025', 'Studio Spectra founded'],
  ['4', 'Projects in collaboration'],
  ['Bengaluru', 'Based and building'],
]

const services = [
  {
    title: 'Custom Home Construction',
    body: 'End-to-end residential builds with disciplined planning, material control, and site supervision.',
  },
  {
    title: 'Architecture-Led Delivery',
    body: 'We protect design intent from concept through execution, so the built home matches the drawn vision.',
  },
  {
    title: 'Interiors & Material Curation',
    body: 'Warm, durable finishes selected with architects and craftspeople for homes that age with grace.',
  },
]

const benefits = [
  'Vetted architects and a trusted eye for space, light, and form.',
  'Shared standards between design intent and built reality.',
  'One coordinated team, fewer meetings, faster decisions.',
]

function VideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return undefined
    }

    let isMounted = true

    const setVideoOpacity = (opacity: number) => {
      video.style.opacity = String(Math.max(0, Math.min(1, opacity)))
    }

    const monitorVideo = () => {
      if (!isMounted || !video.duration || Number.isNaN(video.duration)) {
        animationRef.current = requestAnimationFrame(monitorVideo)
        return
      }

      const fadeDuration = 0.5
      const { currentTime, duration } = video
      const timeRemaining = duration - currentTime

      if (currentTime < fadeDuration) {
        setVideoOpacity(currentTime / fadeDuration)
      } else if (timeRemaining < fadeDuration) {
        setVideoOpacity(timeRemaining / fadeDuration)
      } else {
        setVideoOpacity(1)
      }

      animationRef.current = requestAnimationFrame(monitorVideo)
    }

    const handleEnded = () => {
      setVideoOpacity(0)

      window.setTimeout(() => {
        if (!isMounted) {
          return
        }

        video.currentTime = 0
        void video.play()
      }, 100)
    }

    video.addEventListener('ended', handleEnded)
    setVideoOpacity(0)
    void video.play()
    animationRef.current = requestAnimationFrame(monitorVideo)

    return () => {
      isMounted = false
      video.removeEventListener('ended', handleEnded)

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-center opacity-0"
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/45 to-black/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-transparent to-black/28" />
    </div>
  )
}

function ArchitecturalScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current

    if (!mount) {
      return undefined
    }

    let disposed = false
    let cleanup: (() => void) | undefined

    const initScene = async () => {
      const THREE = await import('three')

      if (disposed || !mountRef.current) {
        return
      }

      const activeMount = mountRef.current
      const scene = new THREE.Scene()
      scene.background = new THREE.Color('#f4f0e8')

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(7, 5, 8)
    camera.lookAt(0, 1.2, 0)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    activeMount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const ambient = new THREE.HemisphereLight('#ffffff', '#9d8b6f', 2.4)
    scene.add(ambient)

    const sun = new THREE.DirectionalLight('#fff4df', 4)
    sun.position.set(4, 8, 6)
    sun.castShadow = true
    scene.add(sun)

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(15, 10),
      new THREE.MeshStandardMaterial({
        color: '#ded6c5',
        roughness: 0.86,
        metalness: 0.02,
      }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    group.add(floor)

    const concrete = new THREE.MeshStandardMaterial({
      color: '#eee9de',
      roughness: 0.72,
      metalness: 0.02,
    })
    const glass = new THREE.MeshStandardMaterial({
      color: '#8eaaa8',
      roughness: 0.18,
      metalness: 0.05,
      transparent: true,
      opacity: 0.6,
    })
    const timber = new THREE.MeshStandardMaterial({
      color: '#8b6a4c',
      roughness: 0.65,
    })
    const dark = new THREE.MeshStandardMaterial({
      color: '#181714',
      roughness: 0.55,
    })

    const addBlock = (
      size: [number, number, number],
      position: [number, number, number],
      material: Material,
    ) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material)
      mesh.position.set(...position)
      mesh.castShadow = true
      mesh.receiveShadow = true
      group.add(mesh)
      return mesh
    }

    addBlock([4.9, 1.5, 2.2], [0, 0.75, 0], concrete)
    addBlock([3.7, 1.15, 2], [-0.35, 2.05, -0.05], concrete)
    addBlock([1.25, 1.05, 2.1], [2.35, 1.9, 0.12], glass)
    addBlock([5.35, 0.16, 2.62], [0.12, 3.32, 0], dark)
    addBlock([5.8, 0.18, 2.9], [0, 1.57, 0], dark)
    addBlock([0.16, 1.7, 2.5], [-2.55, 0.85, 0], timber)
    addBlock([1.35, 0.12, 0.8], [-1.05, 0.12, 1.38], timber)
    addBlock([1.15, 0.92, 0.08], [-1.2, 0.86, 1.12], glass)
    addBlock([1.15, 0.92, 0.08], [0.15, 0.86, 1.12], glass)
    addBlock([1.15, 0.92, 0.08], [1.5, 0.86, 1.12], glass)

    const lineMaterial = new THREE.LineBasicMaterial({
      color: '#5f5648',
      transparent: true,
      opacity: 0.45,
    })

    for (let x = -6; x <= 6; x += 1) {
      const points = [
        new THREE.Vector3(x, 0.012, -4.5),
        new THREE.Vector3(x, 0.012, 4.5),
      ]
      group.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          lineMaterial,
        ),
      )
    }

    for (let z = -4; z <= 4; z += 1) {
      const points = [
        new THREE.Vector3(-6.5, 0.014, z),
        new THREE.Vector3(6.5, 0.014, z),
      ]
      group.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          lineMaterial,
        ),
      )
    }

    const resize = () => {
      const width = activeMount.clientWidth
      const height = activeMount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    let pointerX = 0
    let pointerY = 0
    const handlePointerMove = (event: PointerEvent) => {
      const rect = activeMount.getBoundingClientRect()
      pointerX = (event.clientX - rect.left) / rect.width - 0.5
      pointerY = (event.clientY - rect.top) / rect.height - 0.5
    }

    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      group.rotation.y += (-0.45 + pointerX * 0.22 - group.rotation.y) * 0.025
      group.rotation.x += (pointerY * 0.08 - group.rotation.x) * 0.025
      renderer.render(scene, camera)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)
    activeMount.addEventListener('pointermove', handlePointerMove)

      cleanup = () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('resize', resize)
        activeMount.removeEventListener('pointermove', handlePointerMove)
        renderer.dispose()
        activeMount.removeChild(renderer.domElement)
      }
    }

    void initScene()

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="h-[62vh] min-h-[460px] w-full overflow-hidden bg-[#f4f0e8] md:h-[72vh]"
      aria-label="Interactive 3D architectural massing model"
    />
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[#f7f3eb] text-[#12110f]">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-black/32 backdrop-blur-xl">
        <nav
          className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            className="font-[var(--font-display)] text-3xl leading-none tracking-tight text-white"
          >
            Auriga Homes
            <sup className="ml-0.5 align-super text-xs">&reg;</sup>
          </a>

          <div className="hidden items-center gap-7 xl:flex">
            {navigationItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
                className="text-sm font-medium text-white/72 transition-colors duration-300 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href="#get-in-touch"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03] sm:px-6"
          >
            Begin Journey
          </a>
        </nav>
      </header>

      <main id="home">
        <section className="relative isolate min-h-screen overflow-hidden">
          <VideoBackdrop />

          <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] items-end px-5 pb-10 pt-28 sm:px-8 lg:pb-16">
            <div className="grid w-full items-end gap-10 lg:grid-cols-[1.08fr_0.72fr]">
              <div className="max-w-5xl">
                <p className="animate-fade-rise mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-white/72">
                  Auriga Homes - Bengaluru
                </p>
                <h1 className="animate-fade-rise max-w-5xl font-[var(--font-display)] text-[clamp(4rem,10vw,10.8rem)] font-normal leading-[0.82] tracking-[-0.045em] text-white">
                  Homes built with precision and grace.
                </h1>
                <p className="animate-fade-rise-delay mt-7 max-w-2xl text-base leading-7 text-white/76 sm:text-lg">
                  Auriga Homes creates considered residences with architect-led
                  planning, disciplined construction, and a deep respect for how
                  people live inside a space.
                </p>
                <div className="animate-fade-rise-delay-2 mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#get-in-touch"
                    className="rounded-full bg-white px-8 py-4 text-center text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Start a Project
                  </a>
                  <a
                    href="#collaborations"
                    className="rounded-full border border-white/40 px-8 py-4 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black"
                  >
                    View Collaborations
                  </a>
                </div>
              </div>

              <div className="animate-fade-rise-delay-2 border border-white/18 bg-white/12 p-5 text-white shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/58">
                  Current focus
                </p>
                <p className="mt-4 font-[var(--font-display)] text-3xl leading-tight">
                  Residential construction for families who expect detail at
                  every stage.
                </p>
                <div className="mt-7 grid gap-4 border-t border-white/16 pt-5 sm:grid-cols-3 lg:grid-cols-1">
                  {metrics.map(([value, label]) => (
                    <div key={label}>
                      <p className="font-[var(--font-display)] text-3xl leading-none">
                        {value}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/56">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="what-we-do"
          className="mx-auto grid max-w-[1500px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b7d68]">
              What We Do
            </p>
            <h2 className="mt-5 max-w-xl font-[var(--font-display)] text-5xl font-normal leading-none tracking-tight sm:text-7xl">
              Construction that keeps architecture intact.
            </h2>
          </div>

          <div className="grid gap-px bg-[#d8cfbf] md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="bg-[#f7f3eb] p-7">
                <h3 className="font-[var(--font-display)] text-3xl leading-tight">
                  {service.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-[#665f52]">
                  {service.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="designs" className="bg-[#11100d] text-white">
          <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-0">
            <div className="py-0 lg:py-20">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/46">
                3D Design Study
              </p>
              <h2 className="mt-5 font-[var(--font-display)] text-5xl font-normal leading-none tracking-tight sm:text-7xl">
                Study the home before the first pour.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/66">
                We use spatial planning, architectural documentation, and
                material clarity to make decisions visible early. The result is
                fewer surprises on site and a calmer path to handover.
              </p>
            </div>
            <ArchitecturalScene />
          </div>
        </section>

        <section
          id="collaborations"
          className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:py-28"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b7d68]">
                Built Together
              </p>
              <h2 className="mt-5 max-w-2xl font-[var(--font-display)] text-5xl font-normal leading-none tracking-tight sm:text-7xl">
                A curated circle of architectural collaborators.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#665f52]">
                We are intentional about who we create with. Our collaborators
                are not vendors. They are co-authors of the spaces we deliver.
              </p>
            </div>

            <div className="border-y border-[#d8cfbf]">
              <div className="grid gap-px bg-[#d8cfbf] md:grid-cols-2">
                <div className="bg-[#f7f3eb] p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8b7d68]">
                    Partner
                  </p>
                  <h3 className="mt-5 font-[var(--font-display)] text-5xl leading-none">
                    Studio Spectra
                  </h3>
                  <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#665f52]">
                    Architecture as Art
                  </p>
                </div>
                <div className="bg-[#f7f3eb] p-7">
                  <p className="text-sm leading-7 text-[#665f52]">
                    Contemporary residential and commercial design based in
                    Bengaluru, leading architectural vision on select Auriga
                    projects.
                  </p>
                </div>
              </div>
              <div className="grid gap-px bg-[#d8cfbf] md:grid-cols-3">
                {benefits.map((benefit) => (
                  <p
                    key={benefit}
                    className="bg-[#f7f3eb] p-6 text-sm leading-7 text-[#403b32]"
                  >
                    {benefit}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="get-in-touch"
          className="bg-[#11100d] px-5 py-20 text-white sm:px-8 lg:py-28"
        >
          <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/46">
                Founder - Manoj
              </p>
              <h2 className="mt-5 max-w-4xl font-[var(--font-display)] text-5xl font-normal leading-none tracking-tight sm:text-7xl">
                We do not just build what architects draw. We build what they
                dream.
              </h2>
            </div>

            <div className="self-end border border-white/14 bg-white/[0.06] p-7 backdrop-blur-xl">
              <p className="text-base leading-7 text-white/68">
                We are always open to conversations with architect firms and
                families who share our values. Every enquiry is reviewed
                personally.
              </p>
              <div className="mt-8 space-y-3 text-lg">
                <a href="mailto:hello@aurigahomes.in" className="block">
                  hello@aurigahomes.in
                </a>
                <a href="tel:+918904428450" className="block">
                  +91 89044 28450
                </a>
                <p className="text-sm text-white/52">
                  Instagram @aurigaconstructions
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
