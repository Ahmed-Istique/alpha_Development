function init() {
  // main code for locomotive starts

  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  // main code for locomotive ends
}

init();

document.addEventListener("DOMContentLoaded", function () {
  var cursor = document.querySelector(".cursor");
  var main = document.querySelector(".main");

  main.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX +10 + "px";
    cursor.style.top = e.clientY+10 + window.scrollY + "px"; // Add scrollY to account for page scroll
  });
});

// gsap code starts

// step1: gsap variable making
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    markers: false,
    // markers: true, if you need to see marker
    start: "top 30%",
    end: "top 0",
    scrub: 3,
    onEnter: () => {
      document.querySelector(".page1 h1").classList.add("text-8xl");
    },
    onLeaveBack: () => {
      document.querySelector(".page1 h1").classList.remove("text-8xl");
    },
  },
});
tl.to(
  ".page1 h1",
  {
    x: -100,
  },
  "anim"
);

tl.to(
  ".page1 h2",
  {
    x: 100,
    className: "text-9xl",
  },
  "anim"
);

// passed ,"anim" to each variable to work in same time
// for video
tl.to(
  ".page1 video",
  {
    width: "90%",
  },
  "anim"
);

// for background change

var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2 h1",
    scroller: ".main",
    markers: false,
    // markers: true, if you need to see marker
    start: "top 90%",
    end: "top 80%",
    scrub: 3,
  },
});

tl2.to(".main", {
  backgroundColor: "#fff",
});

var tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page4 h1",
    scroller: ".main",
    markers: false,
    // markers: true, if you need to see marker
    start: "top 90%",
    end: "top 80%",
    scrub: 3,
  },
});

tl4.to(".main", {
  backgroundColor: "#000000",
});

// for the boxes
var cursor = document.querySelector(".cursor");
var boxes = document.querySelectorAll(".box");

boxes.forEach(function (element) {
  element.addEventListener("mouseenter", function () {
    var attributes = element.getAttribute("images");
    // for cursor
    cursor.style.width = "300px";
    cursor.style.height = "300px";
    cursor.style.backgroundImage = `url(${attributes})`;
  });

  element.addEventListener("mouseleave", function () {
    cursor.style.width = "20px"; // Reset the width to its default value
    cursor.style.height = "20px"; // Reset the height to its default value
    cursor.style.backgroundImage = `none`;
  });
});
