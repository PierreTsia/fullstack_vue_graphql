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
    <v-flex sm10 offset-sm1 class="pa-4 mt-2">
      <SliderSelector
        :items="tabs"
        activeItemId="bio"
        @onItemClick="handleTabChange"
      />
    </v-flex>
    <v-flex sm10 offset-sm1 class="profileBlock">
      <component
        :is="activeProfileComponent"
        :class="['profileBlock', `profile__${activeProfileComponentId}`]"
        :isEdited="isInEditMode[activeProfileComponentId]"
        :bio="activeBio"
        @onBioChange="({ bio }) => (tempBio = bio)"
      >
        <template slot="actionBtn">
          <template v-if="!isInEditMode[activeProfileComponentId]">
            <div class="editMenu">
              <v-btn
                round
                small
                color="primary"
                class="ml-auto"
                @click="toggleEdit"
              >
                <v-icon size="18" color="white" class="mr-1">build</v-icon>
                Edit
              </v-btn>
            </div>
          </template>

          <template v-else>
            <div class="editMenu">
              <v-btn
                round
                small
                class="ml-auto"
                color="error"
                @click="handleCancelClick"
              >
                <v-icon color="white" size="18" class="mr-1">cancel</v-icon>
                Cancel
              </v-btn>
              <v-btn
                round
                small
                color="primary"
                @click="handleSaveClick(activeProfileComponentId)"
              >
                <v-icon color="white" size="18" class="mr-1">save</v-icon>
                Save
              </v-btn>
            </div>
          </template>
        </template>
      </component>
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
import { mapGetters, mapActions } from "vuex";
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
      tempBio: "",
      activeProfileComponentId: "bio",
      tabs: [
        {
          id: "bio",
          icon: "speaker_notes",
          label: "Bio"
        },
        {
          id: "social",
          icon: "face",
          label: "Socials"
        },
        {
          id: "info",
          icon: "info",
          label: "Personal Infos"
        }
      ],
      isInEditMode: {
        bio: false,
        social: false,
        info: false
      }
    };
  },
  computed: {
    ...mapGetters(["me", "favoritePosts"]),
    activeProfileComponent() {
      return `profile-${this.activeProfileComponentId}`;
    },
    activeBio() {
      return this.me.profile && this.me.profile.bio
        ? this.me.profile.bio
        : "my default bio";
    }
  },
  methods: {
    ...mapActions(["createProfile"]),
    resetEditMode() {
      this.isInEditMode = { bio: false, social: false, info: false };
    },
    toggleEdit() {
      this.isInEditMode[this.activeProfileComponentId] = !this.isInEditMode[
        this.activeProfileComponentId
      ];
    },
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
    handleTabChange(tab) {
      this.activeProfileComponentId = tab.id;
    },
    handleCancelClick() {
      console.log("cancel");
      this.tempBio = "";
      this.toggleEdit();
    },
    updateProfile(args) {
      console.log(args);
    },
    async handleSaveClick(paramId) {
      console.log("save", paramId);
      const params = { userId: this.me._id };
      if (this.tempBio && this.tempBio.length) {
        params.bio = this.tempBio;
      }
      if (!this.me.profile) {
        await this.createProfile(params);
      } else {
        params.profileId = this.me.profile._id;
        this.updateProfile(params);
      }
      this.resetEditMode();
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
.profileBlock
  position relative
  .profileBlock__header
    display flex
    justify-content center
    align-items center
    .title
      flex-grow 1
      text-align left
      padding-left 2rem
    .editMenu
      min-width 50%
      display flex
    .title
      flex-grow 1
@media screen and (max-width: 960px)
  .profilePage
    padding 0 !important
    .profileTop__avatar
      padding 50px 0 20px 0
    .profileTop__profile
      padding 0 0 50px 0
</style>
