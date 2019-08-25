<template>
  <v-container
    :class="[{ 'mt-4': !isMobile }, 'pb-4', 'profilePage']"
    text-xs-center
  >
    <v-flex sm10 offset-sm1 class="profileTop">
      <ProfileTopBar />
    </v-flex>
    <v-flex sm10 offset-sm1 class="profileBlock">
      <ProfileSummary />
    </v-flex>
    <v-flex sm10 offset-sm1 class="pa-4">
      <SliderSelector
        :items="tabs"
        activeItemId="bio"
        @onItemClick="handleTabChange"
      />
    </v-flex>
    <v-flex sm10 offset-sm1 class="profileBlock">
      <component :is="activeProfileComponent"></component>
    </v-flex>
  </v-container>
</template>

<script>
import countries from "@/utils/countries";
import SliderSelector from "@/components/base/SliderSelector";
import {
  ProfileTopBar,
  ProfileSummary,
  ProfileSocial,
  ProfileInfo,
  ProfileBio
} from "@/components/Auth/profile";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  components: {
    ProfileTopBar,
    ProfileSummary,
    ProfileInfo,
    ProfileSocial,
    ProfileBio,
    SliderSelector
  },
  data() {
    return {
      countries: countries,
      isMobile: false,
      activeProfileComponentId: "bio",
      tabs: [
        {
          id: "bio",
          icon: "exit_to_app",
          label: "Bio"
        },
        {
          id: "social",
          icon: "exit_to_app",
          label: "Socials"
        },
        {
          id: "info",
          icon: "exit_to_app",
          label: "Personal Infos"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["me", "favoritePosts"]),
    activeProfileComponent() {
      return `profile-${this.activeProfileComponentId}`;
    }
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
    handleTabChange(tab) {
      console.log(tab);
      this.activeProfileComponentId = tab.id;
    }
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  }
};
</script>

<style lang="stylus">
.profileTop
  .profileTop__avatar
    padding 50px
    img
      cursor pointer
  .headline
    text-align center
    width 100%
  .profileTop__profile
    display flex
    flex-direction column
    padding 50px 0
    .v-card__title, .v-card__text
      padding 0

@media screen and (max-width: 960px)
  .profilePage
    padding 0 !important
    .profileTop__avatar
      padding 50px 0 20px 0
    .profileTop__profile
      padding 0 0 50px 0
</style>
