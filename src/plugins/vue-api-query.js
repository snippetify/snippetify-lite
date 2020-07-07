"use strict"

import axios from '@/plugins/axios'
import { Model } from 'vue-api-query'

Model.$http = axios
