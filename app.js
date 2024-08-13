const TOTAL_FRAMES = 1345;
const frames = {
  currentIndex: 0,
  maxIndex: TOTAL_FRAMES,
};
let imagesLoaded = 0;
const images = [];

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

function PreLoadImages() {
  for (let i = 1; i <= frames.maxIndex; i++) {
    const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpg`;
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex) {
        LoadImage(frames.currentIndex);
        StartAnimation();
      }
    };
    images.push(img);
  }
}

function LoadImage(index) {
  if (index >= 0 && index <= frames.maxIndex) {
    const img = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;

    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

    frames.currentIndex = index;
  }
}

function UpdateFrame(index) {
  return {
    currentIndex: index,
    ease: "linear",
    onUpdate: () => {
      LoadImage(Math.floor(frames.currentIndex));
    },
  };
}

function StartAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      scrub: 2,
      end: "bottom bottom",
    },
  });

  tl.to(frames, UpdateFrame(50), "a")
    .to(
      ".animate1",
      {
        opacity: 0,
        ease: "linear",
      },
      "a"
    )
    .to(frames, UpdateFrame(80), "b")
    .to(
      ".animate2",
      {
        opacity: 1,
        ease: "linear",
      },
      "b"
    )
    .to(frames, UpdateFrame(110), "c")
    .to(
      ".animate2",
      {
        opacity: 1,
        ease: "linear",
      },
      "c"
    )
    .to(frames, UpdateFrame(140), "d")
    .to(
      ".animate2",
      {
        opacity: 0,
        ease: "linear",
      },
      "d"
    )
    .to(frames, UpdateFrame(170), "e")
    .to(
      ".animate3",
      {
        opacity: 1,
        ease: "linear",
      },
      "e"
    )
    .to(frames, UpdateFrame(200), "f")
    .to(
      ".animate3",
      {
        opacity: 1,
        ease: "linear",
      },
      "f"
    )
    .to(frames, UpdateFrame(230), "g")
    .to(
      ".animate3",
      {
        opacity: 0,
        ease: "linear",
      },
      "g"
    )
    .to(frames, UpdateFrame(260), "h")
    .to(
      ".panel",
      {
        x: "0%",
        ease: "expo",
      },
      "h"
    )
    .to(frames, UpdateFrame(290), "i")
    .to(
      ".panel",
      {
        x: "0%",
        ease: "expo",
      },
      "i"
    )
    .to(frames, UpdateFrame(320), "j")
    .to(
      ".panel",
      {
        opacity: 0,
        ease: "linear",
      },
      "j"
    )
    .to(frames, UpdateFrame(350), "k")
    .to(
      canvas,
      {
        scale: 0.5,
        ease: "linear",
      },
      "k"
    )
    .to(frames, UpdateFrame(380), "l")
    .to(
      ".panelism",
      {
        opacity: 1,
        ease: "linear",
      },
      "l"
    )
    .to(frames, UpdateFrame(410), "l")
    .to(
      ".panelism span",
      {
        width: 200,
        ease: "expo",
      },
      "l"
    )
    .to(frames, UpdateFrame(440), "m")
    .to(
      canvas,
      {
        scale: 1,
        ease: "linear",
      },
      "m"
    )
    .to(frames, UpdateFrame(470), "n")
    .to(
      ".panelism",
      {
        scale: 2,
        ease: "circ",
      },
      "l"
    )
    .to(frames, UpdateFrame(540), "o")
    .to(
      ".panelism",
      {
        scale: 2,
        ease: "circ",
      },
      "o"
    );
}

window.addEventListener("resize", () => {
  LoadImage(Math.floor(frames.currentIndex));
});

PreLoadImages();

document.querySelectorAll(".headings h3").forEach((elm) => {
  gsap.from(elm, {
    scrollTrigger: {
      trigger: elm,
      start: "top 90%",
      bottom: "bottom 20%",
      scrub: 2,
    },
    opacity: 0.3,
  });
});

function SmoothScroll() {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

SmoothScroll();
