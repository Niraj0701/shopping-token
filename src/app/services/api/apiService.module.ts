import { NgModule } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderService } from "./loading.service";
import { AuthInterceptor } from "src/app/security/interceptor";
import { SecurityModule } from "src/app/security/security.module";
import { StorageGetService } from "./storageGet.service";

@NgModule({
  imports: [HttpClientModule, SecurityModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ApiService,
    LoaderService,
    StorageGetService,
  ],
})
export class ApiServiceModule {}
