<template>
  <div class="courtyard">
    <div class="first">
      <div class="stage">
        <div class="video-container">
          <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${ id }?controls=0&modestbranding=1`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
      <div class="yt-link">
        <a
          :href="`https://www.youtube.com/watch?v=${ id }`"
          target="_blank"
        >livestream</a>
      </div>
      <div class="program">
        <div class="title">
          <p class="blue-bold">program</p>
          <p>{{ this.description }}</p>
        </div>
        <div class="schedule">
          <div
            v-for="(day, index) in program"
            :key="`schedule-day-${ index }`"
            class="schedule-day"
          >
            <p
              class="schedule-heading"
            >{{ day.heading }}</p>
            <p
              v-for="(slot, index) in day.slots"
              :key="`schedule-slot-${ index }`"
            >
              {{ slot }}
            </p>
          </div>
        </div>
      </div>
      <div class="lower">
        <div class="links">
          <a href="program.pdf" target="_blank">full program</a>
          <a class="disabled" href="#">catalogue (soon)</a>
        </div>
        <div class="upcoming">
          <marquee
            direction="alternate"
            class="blue-bold"
          >{{ upcoming }}</marquee>
        </div>
      </div>
    </div>
    <div class="second">
      <p>courtyard</p>
    </div>
    <div class="third">
      <div class="title blue-bold">
        <p>join a <br />chat room</p>
      </div>
      <div class="rooms-container">
        <div class="rooms-group">
          <div class="rooms rooms-8">
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🤯🤯🤯"
              target="_blank"
            >🤯</a>
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable👻👻👻"
              target="_blank"
            >👻</a>
          </div>
          <div class="rooms rooms-4">
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable😽😽😽"
              target="_blank"
            >😽</a>
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🧠🧠🧠"
              target="_blank"
            >🧠</a>
          </div>
          <div class="rooms rooms-2">
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🐵🐵🐵"
              target="_blank"
            >🐵</a>
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🍆🍆🍆"
              target="_blank"
            >🍆</a>
          </div>
        </div>
        <div class="rooms-group">
          <div class="rooms rooms-8">
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🍕🍕🍕"
              target="_blank"
            >🍕</a>
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🐁🐁🐁"
              target="_blank"
            >🐁</a>
          </div>
          <div class="rooms rooms-4">
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🦆🦆🦆"
              target="_blank"
            >🦆</a>
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🌚🌚🌚"
              target="_blank"
            >🌚</a>
          </div>
          <div class="rooms rooms-2">
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🍑🍑🍑"
              target="_blank"
            >🍑</a>
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🍓🍓🍓"
              target="_blank"
            >🍓</a>
          </div>
        </div>
        <div class="rooms-group">
          <div class="rooms rooms-8">
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable💣💣💣"
              target="_blank"
            >💣</a>
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable💸💸💸"
              target="_blank"
            >💸</a>
          </div>
          <div class="rooms rooms-4">
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🍩🍩🍩"
              target="_blank"
            >🍩</a>
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🍔🍔🍔"
              target="_blank"
            >🍔</a>
          </div>
          <div class="rooms rooms-2">
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable🍕🍕🍕"
              target="_blank"
            >🍕</a>
            <a
              class="room"
              href="https://meet.jit.si/KISDParcoursCourtyardTable💞💞💞"
              target="_blank"
            >💞</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      id: 'BqVinzsx3-Q',
      description: '',
      program: []
    }
  },
  async mounted () {
    const url = 'https://parcours.kisd.de/api/program'
    const response = await axios.get(url)
    const program = response.data
    const formatted = program.program.map((entry) => {
      const date = entry.time.split(' ')[0]
      const time = entry.time.split(' ')[1]
      return {
        date: date,
        content: `${ time.substring(0, time.length - 3) } ${ entry.content }`
      }
    })
    const dates = [...new Set(formatted.map((entry) => entry.date))]
    this.program = dates.map((date) => {
      return {
        heading: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
        slots: formatted.filter((entry) => entry.date === date).map((entry) => entry.content)
      }
    })
    this.description = program.description
  },
  computed: {
    ...mapGetters({
      upcoming: 'ui/upcoming'
    })
  }
}
</script>

<style scoped>
.courtyard {
  --border: 2px solid #009fe3;
  --fill: #ffed00;
}

.courtyard {
  display: flex;
  position: absolute;
  top: 1425px; /* 3500 / 2 - 325(courtyardh/2) */
  left: 1200px; /* 3500 / 2 - 550(courtyardw/2) */
  width: 1100px;
  height: 650px;
  z-index: 5;
  font-family: nimbus-sans, sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #009fe3;
  font-weight: 700;
  border: var(--border);
  /* border-radius: 35px; */
  cursor: text;
  background-image: url('https://unknown.gruppe5.org/Parcours_Online-notxt.gif');
  background-size: cover;
}

.blue-bold {
  font-size: 2em;
  text-transform: uppercase;
}

.first {
  display: flex;
  flex-flow: column nowrap;
  flex: 2.5;
  padding: 5% 0 5% 5%;
}

.second {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 20%;
  border-left: var(--border);
  border-right: var(--border);
}

.second p {
  font-size: 7.7em;
  color: var(--fill);
  text-transform: uppercase;
  text-shadow: -2px -2px 0 #009fe3, 2px -2px 0 #009fe3, -2px 2px 0 #009fe3, 2px 2px 0 #009fe3;
  transform-origin: center center;
  transform: rotate(90deg) translateY(-6px);
}

.third {
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  padding: 5% 5% 5% 0;
}

.first .stage {
  border-top: var(--border);
  border-left: var(--border);
}

.first .yt-link {
  padding: 0.25em 0;
  text-align: center;
  background: var(--fill);
  border-top: var(--border);
  border-left: var(--border);
}

.first .program {
  display: flex;
  border-top: var(--border);
  border-left: var(--border);
  overflow: hidden;
}

.first .program .title {
  max-width: 35%;
  padding: 2%;
  border-right: var(--border);
}

.first .program .title p:first-of-type {
  margin: 0 0 5% 0;
}

.first .program .schedule {
  width: 100%;
  padding: 2% 0 2% 2%;
  font-size: 1em;
  text-transform: uppercase;
  overflow: hidden;
  overflow-y: scroll;
}

.first .program .schedule .schedule-heading {
  font-size: 1.25em;
}

.first .program .schedule .schedule-day {
  margin: 0 0 2% 0;
}

.first .program .schedule .schedule-day:last-of-type {
  margin: 0;
}

.lower {
  display: flex;
  border-top: var(--border);
  border-left: var(--border);
}

.links {
  display: flex;
  flex-flow: column nowrap;
  flex: 0.8;
  border-right: var(--border);
  background: var(--fill);
}

a {
  padding: 0.25em 0;
  text-align: center;
  color: #009fe3;
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: var(--border);
}

a.disabled {
  cursor: wait;
}

.upcoming {
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 1.5em;
  text-transform: uppercase;
  border-bottom: var(--border);
  overflow: hidden;
  white-space: nowrap;
}

.third .title {
  border-top: var(--border);
  border-right: var(--border);
  border-bottom: var(--border);
  text-align: center;
  padding: 0.25em 0;
}

.rooms-container {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  width: 100%;
}

.rooms-group {
  display: flex;
  flex: 1;
  border-right: var(--border);
  border-bottom: var(--border);
}

.rooms {
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  border-right: var(--border);
}

.rooms:last-of-type {
  border-right: 0;
}

.room {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 1em;
  text-decoration: none;
  border-bottom: var(--border);
  cursor: pointer;
}

.room:last-of-type {
  border-bottom: 0;
}

/* .rooms-4 {
  flex: 0.8;
}

.rooms-2 {
  flex: 0.4;
} */

.video-container {
	position: relative;
	padding-bottom: 56.25%;
	height: 0;
	overflow: hidden;
}

.video-container iframe, .video-container object, .video-container embed {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
